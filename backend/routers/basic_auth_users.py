from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm


app = FastAPI()

oauth2 = OAuth2PasswordBearer(tokenUrl="login")

class User(BaseModel):
    username: str
    full_name: str
    email: str
    disabled: bool

class UserDB(User):
    pwd: str

users_db = {
    "benja": {         
        "username": "john_doe",
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "disabled": False,
    },
    "mabel": {
        "username": "john_doe",
        "full_name": "John Doe",
        "email": "john.doe@example.com",
        "disabled": False,
    },
}


def search_users(username: str):
    if username in users_db:
        return UserDB(**users_db[username])
    
async def current_user(token: str = Depends(oauth2)):
    user = search_users(token)
    if not user:
        raise HTTPException(status_code=401, detail="no pass")
    if user.disabled:
        raise HTTPException(status_code=401, detail="no pass")
@app.post("/login")
async def login(form: OAuth2PasswordRequestForm = Depends()):
    user_db = users_db.get(form.username)
    if not users_db:
        raise HTTPException(status_code=404, detail="xd") 
    user = search_user(form.username)
    if not form.password == user.password:
        raise HTTPException(status_code=404, detail="no pass")
    
    return {"access_token": user.username, "token_type": "bearer"}


@app.get("/users/me")
async def me(user: User = Depends(current_user)):
    return user








