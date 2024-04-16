import requests
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/recommendations', methods=['POST'])
def recommend_playlists():
    # Parse the student data from the request
    student_data = request.json
    
    # Get student performance data (e.g., grades in subjects)
    student_performance = student_data.get('performance')
    grade = student_data.get('class')
    
    # Define a unanimous threshold for low performance in all subjects
    threshold = 40  # Set the same threshold for all subjects
    
    # Initialize a list to store recommended content
    recommended_content = []
    
    # YouTube API key
    YOUTUBE_API_KEY = 'AIzaSyCCZPVVL666YZHtjho1qy_izAqx-VsA8C4'
    
    # Iterate through the student's performance in each subject
    for subject, score in student_performance.items():
        # Check if the student's score is below the threshold
        if score is not None and score < threshold:
            # If the student's score is below the threshold in this subject,
            # search for YouTube videos and playlists related to the subject
            
            # Define the YouTube search query
            search_query = f"courses + for + class + {grade} + {subject}"
            
            # Call the YouTube Data API to search for videos and playlists
            youtube_api_url = f"https://www.googleapis.com/youtube/v3/search?q={search_query}&type=video,playlist&part=snippet&maxResults=5&key={YOUTUBE_API_KEY}"
            response = requests.get(youtube_api_url)
            data = response.json()
            
            # Extract video and playlist information from the response
            for item in data.get('items', []):
                # Initialize a dictionary to store video or playlist details
                content_info = {}
                
                # Determine the kind of item (video or playlist) and extract information
                if item['id']['kind'] == 'youtube#video':
                    content_info['content_id'] = item['id']['videoId']
                elif item['id']['kind'] == 'youtube#playlist':
                    content_info['content_id'] = item['id']['playlistId']
                
                # Add title and thumbnail URL to the dictionary
                content_info['title'] = item['snippet']['title']
                content_info['thumbnail_url'] = item['snippet']['thumbnails']['default']['url']
                
                # Add the content information to the list of recommended content
                recommended_content.append(content_info)
    
    # Return the recommended content (content ID, title, and thumbnail URL) as a JSON response
    return jsonify({'recommended_content': recommended_content[:5]})

if __name__ == '__main__':
    app.run()
