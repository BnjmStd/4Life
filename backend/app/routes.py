from flask import jsonify, request
from . import app, db
from .models import User, Exam

@app.route('/')
def index():
    return "Flask is running!"

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(name=data['name'])
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User created!"}), 201

@app.route('/exams', methods=['POST'])
def create_exam():
    data = request.get_json()
    user_id = data['user_id']
    exam_type = data['exam_type']
    content = data['content']

    new_exam = Exam(user_id=user_id, exam_type=exam_type, content=content)
    db.session.add(new_exam)
    db.session.commit()

    return jsonify({"message": "Exam created!"}), 201
