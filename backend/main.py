from fastapi import FastAPI
from routers import documents, users_db
from fastapi.middleware.cors import CORSMiddleware

# resource static
#from fastapi.staticfiles import StaticFiles

app = FastAPI()

origins = ['http://127.0.0.1:8000/',
           ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# routers
app.include_router(documents.router)
app.include_router(users_db.router)

# static
#app.mount("/static", StaticFiles(directory="static"), name ="static" )
# http://127.0.0.1:8000/static/images/pikachu.png

@app.get("/")
async def root():
    return {"Hello": "World"}

# server run: uvicorn main:app --reload
# /docs
# /recocs

# autenticar = identificarse.
# auterizar = permiso