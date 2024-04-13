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
    
    # Initialize a list to store recommended content
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
                # Extract either course_id (videoId) or playlist_id (playlistId)
                content_id = None
                if item['id']['kind'] == 'youtube#video':
                    content_id = item['id']['videoId']
                elif item['id']['kind'] == 'youtube#playlist':
                    content_id = item['id']['playlistId']
                
                # Add the content ID to the list of recommended content
                if content_id:
                    recommended_content.append(content_id)
    
    # Return the recommended content (course_id and playlist_id) as a JSON response
    return jsonify({'recommended_content': recommended_content[:5]})

if __name__ == '__main__':
    app.run()
