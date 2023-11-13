
from pymongo import MongoClient

db_client = MongoClient()

# Configuración de la conexión a MongoDB en Atlas
mongodb_url = "mongodb+srv://bnjmn:<PzNgmiXFGFnHrZ8e>@cluster0.q04hfcj.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongodb_url)