from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/documents", tags = ["documents"], responses = {404:{"message": "no encontrado"}})

documents_list = ["asd", "asd"]

@router.get("/")
async def get_documents():
    return documents_list

@router.get("/{id}")
async def get_document(id: int):
    return documents_list
