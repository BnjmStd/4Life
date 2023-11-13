
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

user = os.getenv("DATABASE_USER")
pwd = os.getenv("DATABASE_PASSWORD")


db_client = MongoClient()




# Configuración de la conexión a MongoDB en Atlas
mongodb_url = "`mongodb+srv://{}:<{}>@cluster0.q04hfcj.mongodb.net/?retryWrites=true&w=majority`".format(user, pwd)
client = MongoClient(mongodb_url)