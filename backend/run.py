from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app import create_app

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///friends.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] =  False

db = SQLAlchemy(app)

app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
