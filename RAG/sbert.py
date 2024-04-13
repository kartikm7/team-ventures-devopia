from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

def compare_answers(student_answer, rag_answer):
    embeddings = model.encode([rag_answer, student_answer])
    
    similarity_score = util.cos_sim(embeddings[0], embeddings[1])
    
    return similarity_score.item()

def main():
    student_answer = "PM Modi said that even Babasaheb Ambedkar would not be able dismantle the Indian Constitution"
    rag_answer = "That even he would not be able to abolish the Indian Constitution now."
    
    similarity_score = compare_answers(student_answer, rag_answer)
    print(f"Similarity score: {similarity_score}")

if __name__ == "__main__":
    main()