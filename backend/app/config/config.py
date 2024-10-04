from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from flask_migrate import Migrate
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Inicializar la aplicación Flask
app = Flask(__name__)
CORS(app)

# Configuración de la base de datos
db_params = {
    "dbname": os.getenv('POSTGRES_DB'),
    "user": os.getenv('POSTGRES_USER'),
    "password": os.getenv('POSTGRES_PASSWORD'),
    "host": os.getenv('POSTGRES_HOST'),
    "port": os.getenv('POSTGRES_PORT')
}

app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{db_params['user']}:{db_params['password']}@{db_params['host']}:{db_params['port']}/{db_params['dbname']}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Inicializar SQLAlchemy y Migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)