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
async def user(id: int):
    a = filter(lambda user: user.id == id, users_list)
    try:
        return list(a)[0] 
    except:
        return {"benja": "hola"}