import requests

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
    
    # Initialize a list to store recommended playlists
    recommended_playlists = []
    
    # YouTube API key
    YOUTUBE_API_KEY = 'AIzaSyCCZPVVL666YZHtjho1qy_izAqx-VsA8C4'
    
    # Iterate through the student's performance in each subject
    for subject, score in student_performance.items():
        threshold = thresholds.get(subject)
        
        # Check if the student's score is below the threshold
        if score is not None and threshold is not None and score < threshold:
            # If the student's score is below the threshold in this subject,
            # search for YouTube playlists related to the subject
            
            # Define the YouTube search query
            search_query = f"{subject} tutorial"
            
            # Call the YouTube Data API to search for playlists
            youtube_api_url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={search_query}&type=playlist&maxResults=5&key={YOUTUBE_API_KEY}"
            response = requests.get(youtube_api_url)
            data = response.json()
            
            # Extract playlist information from the response
            for item in data.get('items', []):
                playlist_info = {
                    'title': item['snippet']['title'],
                    'playlist_id': item['id']['playlistId'],
                    'description': item['snippet']['description']
                }
                recommended_playlists.append(playlist_info)
    
    # Return the recommended playlists as a JSON response
    return jsonify({'recommended_playlists': recommended_playlists})
