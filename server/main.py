import requests
from flask import Flask, request, jsonify
import os
import json
import warnings
import io
import fitz
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain import PromptTemplate
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
import google.generativeai as genai
from sentence_transformers import SentenceTransformer, util
from PIL import Image
from flask_cors import CORS, cross_origin

warnings.filterwarnings("ignore")

API_KEY = "AIzaSyBfMvikYUef6xxUi2wqOY6V88qbo0_8RP0"
genai.configure(api_key=API_KEY)

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


def get_gemini_response_marksheet(image_url):
    prompt = """
    GIVE ME THE SUBJECT, TOTAL MARKS AND OBTAINED MARKS IN THE JSON FORMAT
    [{"subjects" : <<subjec_name>>,
      "total_marks": <<total marks>>,
      "obtained_marks": <<obtained marks>>}]
    """
    response = requests.get(image_url)
    if response.status_code == 200:
        image = Image.open(io.BytesIO(response.content))

    model = genai.GenerativeModel("gemini-pro-vision")
    response = model.generate_content([image, prompt])
    x = json.loads(response.text)
    filtered_subjects = [
        subject for subject in x if isinstance(subject["obtained_marks"], (int, float))
    ]
    sorted_subjects = sorted(
        filtered_subjects, key=lambda x: x["obtained_marks"], reverse=True
    )

    return sorted_subjects


def download_pdf_and_convert_to_pillow_images(pdf_link):
    response = requests.get(pdf_link)

    if response.status_code == 200:
        with open("temp_pdf.pdf", "wb") as f:
            f.write(response.content)

        pdf_document = fitz.open("temp_pdf.pdf")

        pillow_images = []

        for page_number in range(len(pdf_document)):
            page = pdf_document.load_page(page_number)
            image_list = page.get_images(full=True)

            for img_index, img_info in enumerate(image_list):
                xref = img_info[0]

                base_image = pdf_document.extract_image(xref)
                image_bytes = base_image["image"]

                pillow_image = Image.open(io.BytesIO(image_bytes))
                pillow_images.append(pillow_image)

        pdf_document.close()

        return pillow_images
    else:
        print("Failed to download PDF. Status code:", response.status_code)
        return None


def extract_images_from_pdf(pdf_path):
    extracted_images = []

    pdf_document = fitz.open(pdf_path)

    for page_number in range(len(pdf_document)):
        page = pdf_document.load_page(page_number)
        image_list = page.get_images(full=True)

        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]

            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]

            pillow_image = Image.open(io.BytesIO(image_bytes))
            extracted_images.append(pillow_image)

    pdf_document.close()

    return extracted_images


def load_and_split_pdfs(pdf_directory):
    page_contents = []
    pdf_files = [f for f in os.listdir(pdf_directory) if f.endswith(".pdf")]
    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_directory, pdf_file)
        doc = fitz.open(pdf_path)

        for page_num in range(doc.page_count):
            page = doc[page_num]
            text = page.get_text()
            page_contents.append(text)

        doc.close()

    return page_contents


def pdf2vec(pdf_directory, embeddings_model):
    pages = load_and_split_pdfs(pdf_directory)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    context = "\n\n".join(str(page) for page in pages)
    texts = text_splitter.split_text(context)

    vectors = Chroma.from_texts(texts, embeddings_model).as_retriever(
        search_kwargs={"k": 5}
    )
    return vectors


def create_qa_chain_model(gemini_pro_model, vector_index, question):
    template = """
    Use the following pieces of context to answer the questions asked by the user. 
    Context : {context}
    Question: {question}
    Helpful Answer: Provide the response in one single string.
    """

    QA_CHAIN_PROMPT = PromptTemplate.from_template(template)
    qa_chain = RetrievalQA.from_chain_type(
        gemini_pro_model,
        retriever=vector_index,
        # return_source_documents=True,
        chain_type_kwargs={"prompt": QA_CHAIN_PROMPT},
    )
    result = qa_chain({"query": question})

    return result.get("result", "")


def get_gemini_response(image):
    prompt = """
    GIVE ME THE TWO THINGS IN THIS IMAGE:-
    - Question
    - Answer

    STRICTLY RETURN IN THIS FORMAT {{"output":[<questions with answers>]}}
    """
    # image = Image.open(image_path)

    model = genai.GenerativeModel("gemini-pro-vision")
    response = model.generate_content([image, prompt])
    return json.loads(response.text)


def compare_answers(model, student_answer, rag_answer):
    embeddings = model.encode([rag_answer, student_answer])
    similarity_score = util.cos_sim(embeddings[0], embeddings[1])
    return similarity_score.item()


def score_student(sbert_model, gemini_model, vector_index, images):
    op = []
    # images = extract_images_from_pdf(pdf_path)
    for image_path in images:
        print(op)
        try:
            # image_path = Image.open(image_path)
            student_answer = get_gemini_response(image_path)

            for item in student_answer["output"]:
                q = item.get("question", "")
                a = item.get("answer", "")
                if q and a:
                    rag_answer = create_qa_chain_model(gemini_model, vector_index, q)
                    similarity_score = compare_answers(sbert_model, a, rag_answer)
                    op.append(
                        {
                            "question": q,
                            "ai_generated_answer": rag_answer,
                            "student_answer": a,
                            "semantic_score": similarity_score,
                        }
                    )
        except Exception as e:
            print(e)
    return op


@app.route("/score_student", methods=["POST"])
def score_student_api():
    data = request.json
    embeddings_model = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001", google_api_key=API_KEY
    )

    sbert_model = SentenceTransformer("paraphrase-MiniLM-L6-v2")
    gemini_model = ChatGoogleGenerativeAI(
        model="gemini-pro",
        google_api_key=API_KEY,
        temperature=0.2,
        convert_system_message_to_human=True,
    )

    pdf_directory = os.getcwd() + "/data"
    vector_index = pdf2vec(pdf_directory, embeddings_model)

    image_path = data.get("image_path", "")
    pillow_images = download_pdf_and_convert_to_pillow_images(image_path)
    print(pillow_images)
    if not pillow_images:
        return jsonify({"error": "Failed to process PDF."}), 400

    result = score_student(sbert_model, gemini_model, vector_index, pillow_images)

    return jsonify(result), 200


@app.route("/recommendations", methods=["POST"])
def recommend_playlists():
    # Parse the student data from the request
    student_data = request.json

    # Get student performance data (e.g., grades in subjects)
    student_performance = student_data.get("performance")
    grade = student_data.get("class")

    # Define a unanimous threshold for low performance in all subjects
    threshold = 100  # Set the same threshold for all subjects

    # Initialize a list to store recommended content
    recommended_content = []

    # YouTube API key
    YOUTUBE_API_KEY = "AIzaSyAVSc9ZgLsqFZXjpdKPa-G-gYeh9Fh2l-s"

    # Iterate through the student's performance in each subject
    for subject, score in student_performance.items():
        # Check if the student's score is below the threshold
        if score is not None and score < threshold:
            # If the student's score is below the threshold in this subject,
            # search for YouTube videos and playlists related to the subject

            # Define the YouTube search query
            search_query = f"courses + for + class + {grade} + {subject}"

            # Call the YouTube Data API to search for videos and playlists
            youtube_api_url = f"https://www.googleapis.com/youtube/v3/search?q={search_query}&type=video,playlist&part=snippet&maxResults=5&key={YOUTUBE_API_KEY}"
            response = requests.get(youtube_api_url)
            data = response.json()
            # Extract video and playlist information from the response
            for item in data.get("items", []):
                # Initialize a dictionary to store video or playlist details
                content_info = {}

                # Determine the kind of item (video or playlist) and extract information
                if item["id"]["kind"] == "youtube#video":
                    content_info["content_id"] = item["id"]["videoId"]
                elif item["id"]["kind"] == "youtube#playlist":
                    content_info["content_id"] = item["id"]["playlistId"]

                # Add title and thumbnail URL to the dictionary
                content_info["title"] = item["snippet"]["title"]
                content_info["thumbnail_url"] = item["snippet"]["thumbnails"][
                    "default"
                ]["url"]

                # Add the content information to the list of recommended content
                recommended_content.append(content_info)

                print(recommended_content[:5])
    # Return the recommended content (content ID, title, and thumbnail URL) as a JSON response
    return jsonify({"recommended_content": recommended_content[:5]})


@app.route("/marksheet", methods=["POST"])
@cross_origin()
def get_marksheet_details():
    data = request.json

    image_url = data.get("image_url", "")
    if not image_url:
        return jsonify({"error": "Please provide both question and image_path."}), 400

    result = get_gemini_response_marksheet(image_url)
    return jsonify(result), 200

if __name__ == "__main__":
    app.run(debug=True)
