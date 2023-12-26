import uvicorn
from fastapi import FastAPI
from routers import documents, users_db


# resource static
from fastapi.staticfiles import StaticFiles
from config.loggin import logger


# middleware
from config.middleware import log_middleware
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

logger.info('Starting api4life')

app.add_middleware(BaseHTTPMiddleware, dispatch=log_middleware)

# routers
app.include_router(documents.router)
app.include_router(users_db.router)

# static
#app.mount("/static", StaticFiles(directory="static"), name ="static" )
# http://127.0.0.1:8000/static/images/pikachu.png
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"Hello": "World"}

if __name__ == "__main__":
    uvicorn.run(main, host="0.0.0.0", port=8000)

# server run: uvicorn main:app --reload
# /docs
# /recocs

# autenticar = identificarse.
# auterizar = permiso