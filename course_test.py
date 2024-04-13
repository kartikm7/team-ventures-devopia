import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommend_playlists():
    # Parse the student data from the request
    student_data = request.json
    
    # Get student performance data (e.g., grades in subjects)
    student_performance = student_data.get('performance')
    
    # Define a threshold for low performance in each subject
    thresholds = {
        'english': 60,  # Set appropriate thresholds for each subject
        'math': 60,
        'science': 60
    }
    
    # Initialize a list to store recommended videos and playlists
    recommended_content = []
    
    # YouTube API key
    YOUTUBE_API_KEY = 'AIzaSyCCZPVVL666YZHtjho1qy_izAqx-VsA8C4'
    
    # Iterate through the student's performance in each subject
    for subject, score in student_performance.items():
        threshold = thresholds.get(subject)
        
        # Check if the student's score is below the threshold
        if score is not None and threshold is not None and score < threshold:
            # If the student's score is below the threshold in this subject,
            # search for YouTube videos and playlists related to the subject
            
            # Define the YouTube search query
            search_query = f"{subject} tutorial"
            
            # Call the YouTube Data API to search for videos and playlists
            youtube_api_url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={search_query}&type=video,playlist&maxResults=5&key={YOUTUBE_API_KEY}"
            response = requests.get(youtube_api_url)
            data = response.json()
            
            # Extract video and playlist information from the response
            for item in data.get('items', []):
                content_info = {
                    'title': item['snippet']['title'],
                    'link': f"https://www.youtube.com/watch?v={item['id']['videoId']}" if item['id']['kind'] == 'youtube#video' else f"https://www.youtube.com/playlist?list={item['id']['playlistId']}",
                    'description': item['snippet']['description']
                }
                recommended_content.append(content_info)
    
    # Return the recommended videos and playlists as a JSON response
    return jsonify({'recommended_content': recommended_content})

if __name__ == '__main__':
    app.run()
