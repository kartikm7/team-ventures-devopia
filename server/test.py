from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample data representing student grades and tests
grades_data = {
    1: {
        "grade": 1,
        "tests": {
            "difficulty": "Easy",
            "questions": [
                {
                    "id": 1,
                    "question": "What is 2 + 2?",
                    "options": ["3", "4", "5", "6"],
                    "answer": "4"
                },
                {
                    "id": 2,
                    "question": "What is 3 + 5?",
                    "options": ["7", "8", "9", "10"],
                    "answer": "8"
                }
            ]
        }
    }
}

# Endpoint to get a grade's tests
@app.route('/grades/<int:grade_level>', methods=['GET'])
def get_grade_tests(grade_level):
    grade = grades_data.get(grade_level)
    if grade:
        return jsonify(grade), 200
    else:
        return jsonify({"error": "Grade not found"}), 404

# Endpoint to add a new grade with tests
@app.route('/grades', methods=['POST'])
def add_grade():
    data = request.json
    grade_level = data.get('grade')
    if grade_level in grades_data:
        return jsonify({"error": "Grade already exists"}), 400
    
    grades_data[grade_level] = data
    return jsonify({"message": "Grade added"}), 201

# Endpoint to update an existing grade's tests
@app.route('/grades/<int:grade_level>', methods=['PUT'])
def update_grade(grade_level):
    if grade_level not in grades_data:
        return jsonify({"error": "Grade not found"}), 404
    
    data = request.json
    grades_data[grade_level] = data
    return jsonify({"message": "Grade updated"}), 200

# Endpoint to delete a grade and its tests
@app.route('/grades/<int:grade_level>', methods=['DELETE'])
def delete_grade(grade_level):
    if grade_level not in grades_data:
        return jsonify({"error": "Grade not found"}), 404
    
    del grades_data[grade_level]
    return jsonify({"message": "Grade deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True)
