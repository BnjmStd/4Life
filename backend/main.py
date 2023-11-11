from fastapi import FastAPI
from routers import documents, users

# resource static
from fastapi.staticfiles import StaticFiles



app = FastAPI()

# routers
app.include_router(documents.router)
app.include_router(users.router)


# static

app.mount("/static", StaticFiles(directory="static"), name ="static" )

# http://127.0.0.1:8000/static/images/pikachu.png

@app.get("/")
async def root():
    return {"Hello": "World"}

# server run: uvicorn main:app --reload
# /docs
# /recocs