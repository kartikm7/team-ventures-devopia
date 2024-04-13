from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Define the two texts
text1 = "PM Modi said that even Babasaheb Ambedkar would not be able dismantle the Indian Constitution"
text2 = "That even he would not be able to abolish the Indian Constitution now. Thanks for asking!"

# Create a TfidfVectorizer object
vectorizer = TfidfVectorizer()

# Convert the texts into TF-IDF vectors
tfidf_matrix = vectorizer.fit_transform([text1, text2])

# Compute the cosine similarity between the two texts
cosine_sim = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])

# Print the cosine similarity value
print(f"Cosine similarity between the two texts: {cosine_sim[0][0]}")
