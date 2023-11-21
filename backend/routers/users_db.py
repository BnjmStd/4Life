from fastapi import APIRouter, HTTPException, status
from bson import ObjectId

# models
from db.models.users import User

# collection
from db.client import collection

# schemas
from db.schemas.user import list_serial
from db.schemas.user import user_schema

router = APIRouter(prefix="/user", tags = ["user"], responses = {404:{"message": "no encontrado"}})

documents_list = ["asd", "asd"]

@router.get("/")
async def get_users():
    users_lists = list_serial(collection.find())
    return users_lists

@router.get("/{id}")
async def get_document(id: str, user: User):
    # user_find = collection.find_one({"_id": ObjectId(id)})
    user_find = collection.find_one({"username": id})
    
    if user_find:
        return user_find
    else:
        raise HTTPException(status_code = 404, detail = "User not found")

@router.post("/", response_model = User)
async def add_user(user: User):
    inserted_user = collection.insert_one(dict(user))
    new_user = collection.find_one({"_id": inserted_user.inserted_id})
    return new_user

@router.put("/{id}")
async def put_user(id: str, user: User):
    collection.find_one_and_update({"_id": ObjectId(id)}, {"$set": dict(user)})

# delete
@router.delete("/{id}")
async def delete_user(id: str, user: User):
    collection.find_one_and_delete({"_id": ObjectId(id)})









