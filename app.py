from flask import Flask, request, jsonify
from PIL import Image
import os
import json
import google.generativeai as genai
from sentence_transformers import SentenceTransformer
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain import PromptTemplate
from server.compare_answers import score_student  # Import your function from the second code file
from server.compare_answers import load_and_split_pdfs

# Initialize Flask application
app = Flask(__name__)

# Configure your API key
API_KEY = "AIzaSyBfMvikYUef6xxUi2wqOY6V88qbo0_8RP0"  # Replace with your actual API key
genai.configure(api_key=API_KEY)

# Load models and vector index
# Modify the following lines to load the models and vector index as per your setup
embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=API_KEY)
gemini_model = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=API_KEY, temperature=0.2, convert_system_message_to_human=True)
sbert_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
pdf_directory = os.getcwd() + "/server/data"
vector_index = Chroma.from_texts(load_and_split_pdfs(pdf_directory), embeddings_model).as_retriever(search_kwargs={"k": 5})

# Define a route to handle file uploads
@app.route('/upload', methods=['POST'])
def upload_image():
    # Check if the file is in the request
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    # Get the uploaded file
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save the file temporarily for processing
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)

    # Open the image
    image = Image.open(file_path)

    # Process the image and extract the question and student's answer
    student_answer = get_gemini_response(file_path)

    # Define the question (you might want to adjust this according to the user's request)
    question = "What are chemical equations in 250 words"  # Modify according to your application

    # Compare the student's answer with the RAG model's answer
    result = score_student(sbert_model, gemini_model, vector_index, question, file_path)

    # Return the result as a JSON response
    return jsonify(result)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
