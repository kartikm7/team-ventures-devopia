from flask import Flask, render_template
import google.generativeai as genai
from PIL import Image
from server.compare_answers import score_student, create_qa_chain_model, pdf2vec
from sentence_transformers import SentenceTransformer
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import os
from server.compare_answers import get_gemini_response

# API Key Configuration
API_KEY = "AIzaSyBfMvikYUef6xxUi2wqOY6V88qbo0_8RP0"
genai.configure(api_key=API_KEY)

# Initialize Flask application
app = Flask(__name__)

# Initialize models and embeddings
embeddings_model = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=API_KEY)
gemini_model = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=API_KEY, temperature=0.2, convert_system_message_to_human=True)
sbert_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Load the vector index
pdf_directory = os.path.join(os.getcwd(), "server/data")
vector_index = pdf2vec(pdf_directory, embeddings_model)

# Define a route to display the comparison results on an HTML page
@app.route('/compare')
def display_results():
    # Define the reference question
    reference_question = "What are chemical equations in 250 words?"
    
    # Path to the image file
    image_path = "server/student-answers/IMG_6067.png"
    
    # Get the student's answer from the image
    student_answer = get_gemini_response(image_path)
    
    # Compare the student's answer with the reference answer using score_student function
    result = score_student(sbert_model, gemini_model, vector_index, reference_question, image_path)
    
    # Render the HTML template and pass the results as context
    return render_template('results.html',
                           student_answer=student_answer,
                           reference_question=reference_question,
                           similarity_score=result['semantic_score'])

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
