from fastapi import APIRouter, HTTPException, status
from bson import ObjectId

# models
from db.models.users import User

# collection
from db.client import collection

# schemas
from db.schemas.user import list_serial
from db.schemas.user import user_schema

router = APIRouter(prefix="/db", tags = ["dbs"], responses = {404:{"message": "no encontrado"}})

documents_list = ["asd", "asd"]

@router.get("/")
async def get_documents():
    todos = list_serial(collection.find())
    return todos

@router.get("/{id}")
async def get_document(id: int):
    return documents_list

@router.post("/", response_model = User)
async def add_user(user: User):
    collection.insert_one(dict(user))
    return []

@router.put("/{id}")
async def put_user(id: str, user: User):
    collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(user)})

# delete
@router.delete("/{id}")
async def delete_user(id: str, user: User):
    collection.find_one_and_delete({"_id": ObjectId(id)})









