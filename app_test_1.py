import google.generativeai as genai
from PIL import Image
from server.compare_answers import score_student, create_qa_chain_model, pdf2vec
from sentence_transformers import SentenceTransformer
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import Chroma
import os

# API Key Configuration
API_KEY = "AIzaSyBfMvikYUef6xxUi2wqOY6V88qbo0_8RP0"
genai.configure(api_key=API_KEY)

# Initialize models and embeddings
embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=API_KEY)
gemini_model = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=API_KEY, temperature=0.2, convert_system_message_to_human=True)
sbert_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Load the vector index
pdf_directory = os.path.join(os.getcwd(), "D:/CODING/DEVOPIA/team-ventures-devopia/server/data")
vector_index = pdf2vec(pdf_directory, embeddings_model)

# Define the reference question
reference_question = "What are chemical equations in 250 words?"

# Define a function to get the student's answer from the image
def get_gemini_response(image_path):
    # Open the image file
    image = Image.open(image_path)
    
    # Generate content using Gemini AI model
    prompt = "RETURN THE FOLLOWING TWO THINGS TO ME: QUESTION AND ANSWER"
    model = genai.GenerativeModel('gemini-pro-vision')
    response = model.generate_content([image, prompt])
    
    # Parse the response and return the student's answer
    student_answer = response.text
    return student_answer

# Path to the image file
image_path = "D:/CODING/DEVOPIA/team-ventures-devopia/server/student-answers/IMG_6067.png"

# Get the student's answer from the image
student_answer = get_gemini_response(image_path)

# Compare the student's answer with the reference answer using score_student function
result = score_student(sbert_model, gemini_model, vector_index, reference_question, image_path)

# Output the result
print("Student's answer:", student_answer)
print("Reference question:", reference_question)
print("Comparison result:", result)
