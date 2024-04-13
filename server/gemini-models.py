import warnings
import os
import json
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

warnings.filterwarnings("ignore")

# load_dotenv('.env')
# API_KEY = os.getenv("API_KEY")
# API_KEY = "AIzaSyBfMvikYUef6xxUi2wqOY6V88qbo0_8RP0"
API_KEY = "AIzaSyA7luCVarpUfgQz5G4vAKR3KUY8losODRs"
genai.configure(api_key=API_KEY)

def load_and_split_pdfs(pdf_directory):
    page_contents = []
    pdf_files = [f for f in os.listdir(pdf_directory) if f.endswith('.pdf')]
    for pdf_file in pdf_files:
        pdf_path = os.path.join(pdf_directory, pdf_file)
        doc = fitz.open(pdf_path)
        
        for page_num in range(doc.page_count):
            page = doc[page_num]
            text = page.get_text()
            page_contents.append(text)
            
        doc.close()

    return page_contents

def pdf2vec(pdf_directory,embeddings_model):
    pages = load_and_split_pdfs(pdf_directory)
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=10000, chunk_overlap=1000)
    context = "\n\n".join(str(page) for page in pages)
    texts = text_splitter.split_text(context)

    vectors = Chroma.from_texts(texts, embeddings_model).as_retriever(search_kwargs={"k": 5})
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
        chain_type_kwargs={"prompt": QA_CHAIN_PROMPT}
    )
    result = qa_chain({"query": question})

    return result.get('result','')


def get_gemini_response(image_path):
    # prompt = """
    # RETURN THE TEXT IN THIS IMAGE
    # """
    prompt = """
    GIVE ME THE TWO THINGS IN THIS IMAGE:-
    - Question
    - Answer

    STRICTLY RETURN IN THIS FORMAT {{"output":[<questions with answers>]}}
    
   
"""
    image = Image.open(image_path)

    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([image, prompt])
    return json.loads(response.text)

def compare_answers(model,student_answer, rag_answer):
    embeddings = model.encode([rag_answer, student_answer])
    
    similarity_score = util.cos_sim(embeddings[0], embeddings[1])
    
    return similarity_score.item()

def score_student(sbert_model,gemini_model, vector_index,question,image_path):
    op = []
    student_answer = get_gemini_response(image_path)
    print(student_answer)
    print(type(student_answer['output']))
    for item in student_answer['output']:
        q = item.get("question","")
        a = item.get("answer","")
        print(q,a)
        if q and a:
            rag_answer = create_qa_chain_model(gemini_model,vector_index,q)
            similarity_score = compare_answers(sbert_model,a, rag_answer)
            op.append({
                "question" : q,
                "ai_generated_answer" : rag_answer,
                "student_answer" : a,
                "semantic_score" : similarity_score
            })
    return op

if __name__ == "__main__":
    embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=API_KEY)
    gemini_model = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=API_KEY, temperature=0.2, convert_system_message_to_human=True)
    sbert_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    pdf_directory = os.getcwd()+"/data"
    vector_index = pdf2vec(pdf_directory,embeddings_model)
    question = "What are chemical equations in 500 words"
    image_pth = "/Users/rahuldandona/Desktop/Projects/Devopia/team-ventures-devopia/server/student-answers/newmqa.jpeg"
    x = score_student(sbert_model,gemini_model,vector_index,question,image_pth)

    with open("/Users/rahuldandona/Desktop/Projects/Devopia/team-ventures-devopia/server/outputs/op.json", "w") as json_file:
        json.dump(x, json_file, indent=4)







