from fastapi import FastAPI, Request
from routers import documents, users, users_db
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

# resource static
#from fastapi.staticfiles import StaticFiles

app = FastAPI()

origins = ['http://127.0.0.1:8000/',
           ]

# imprime en consola el origin request
@app.middleware("http")
async def log_origin(request: Request, call_next):
    # Obtiene el origen de la solicitud desde el encabezado "Origin"
    origin = request.headers.get("Origin")
    
    # Imprime el origen de la solicitud en la consola
    print(f"Origin of the request: {origin}")
    
    # Continúa con la solicitud
    response = await call_next(request)
    
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

# routers
app.include_router(documents.router)
app.include_router(users.router)
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