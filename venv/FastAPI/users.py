from fastapi import FastAPI
from pydantic import BaseModel

# entidad users

class User(BaseModel):
    id: int
    name: str
    username: str
    url: str
    age: int

users_list = [User(id = 1, name = "benja", username = "javier", url = "asd", age = 11),
        User(id = 2, name = "benja", username = "javier", url = "asd", age = 12),
        User(id = 3, name = "benja", username = "javier", url = "asd", age = 13)]


app = FastAPI()

@app.get("/users")
async def users():
    return users_list

@app.get("/users/{id}")
async def search_user(id: int):
    a = filter(lambda user: user.id == id, users_list)
    try:
        return list(a)[0] 
    except:
        return {"benja": "hola"}

@app.post("/user/")
async def add_user(user: User):
    if type(search_user(user.id)) == User:
        return {"Error": "El usuario existe"}
    else:
        users_list.append(user)
        return user

# path para actualizar una sola variable del usaurio
# put usuario completo

@app.put("/user/")
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


@app.delete("/user/{id}")
async def user_delete(id: int):
    for index, saved_user in enumerate(users_list):
        if saved_user.id == id:
            del users_list[index]

