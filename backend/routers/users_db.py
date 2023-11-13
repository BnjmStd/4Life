from fastapi import APIRouter, HTTPException, status
from db.models.users import User
from db.client import db_client
from db.schemas.user import user_schema

router = APIRouter(prefix="/db", tags = ["dbs"], responses = {404:{"message": "no encontrado"}})

documents_list = ["asd", "asd"]

@router.get("/")
async def get_documents():
    return documents_list

@router.get("/{id}")
async def get_document(id: int):
    return documents_list

@router.post("/", response_model = User)
async def add_user(user: User):
    
    # convierto el user en un diccionario
    user_dict = dict(user)
    
    del user_dict["id"]
    

    id = db_client.test.users.insert_one(user_dict).inserted_id
    print (id)
    # new_user = user_schema(db_client.test.users.find_one({"_id": id}))

    return [] # User(**new_user)









