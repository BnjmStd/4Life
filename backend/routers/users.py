from fastapi import APIRouter, HTTPException
from db.models.users import User

router = APIRouter()

# entidad users
users_list = []

@router.get("/users")
async def users():
    return users_list

@router.get("/users/{id}")
async def search_user(id: int):
    a = filter(lambda user: user.id == id, users_list)
    try:
        return list(a)[0] 
    except:
        return {"benja": "hola"}

@router.post("/user/", response_model = User, status_code=201)
async def add_user(user: User):
    
    if type(search_user(user.id)) == User:
        raise HTTPException(status_code = 204, detail = "El usuario ya existe")

    else:
        users_list.append(user)
        return user

# path para actualizar una sola variable del usaurio
# put usuario completo

@router.put("/user/")
async def user_update(user:User):
    found = False
    
    for index, saved_user in enumerate(users_list):
        if saved_user.id == user.id:
            users_list[index] = user
            found = True
    if not found:
        return {"Error": "El usuario existe"}
    else:
        return user


@router.delete("/user/{id}")
async def user_delete(id: int):
    for index, saved_user in enumerate(users_list):
        if saved_user.id == id:
            del users_list[index]
