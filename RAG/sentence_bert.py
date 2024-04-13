from sentence_transformers import SentenceTransformer, util

# Load the pre-trained Sentence Transformers model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Function to compare answers using Sentence Transformers
def compare_answers(question, student_answer, rag_answer):
    # Generate embeddings for both the student's answer and the model-generated answer
    embeddings = model.encode([rag_answer, student_answer])
    
    # Calculate cosine similarity between the embeddings
    similarity_score = util.cos_sim(embeddings[0], embeddings[1])
    
    # Return the similarity score as a float value
    return similarity_score.item()

# Main function
def main():
    # Define a question and the student's answer
    question = "What did PM Modi say about Babasaheb Ambedkar?"
    student_answer = "PM Modi said that even Babasaheb Ambedkar would not be able dismantle the Indian Constitution"
    
    # Define the model-generated answer (for example, retrieved using a RAG model)
    rag_answer = "That even he would not be able to abolish the Indian Constitution now."
    
    # Calculate the similarity score between the student's answer and the model-generated answer
    similarity_score = compare_answers(question, student_answer, rag_answer)
    
    # Print the similarity score
    print(f"Similarity score: {similarity_score}")

if __name__ == "__main__":
    main()
