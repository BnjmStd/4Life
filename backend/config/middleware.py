from fastapi import Request
from config.loggin import logger
import time

async def log_middleware(request: Request, call_next):
    start = time.time()
    
    
    
    
    response = await call_next(Request)
    process_time = time.time() - start
    log_dict = {
        'url': request.url.path,
        'method': request.method,
        'process_time': process_time
    }

    logger.info(log_dict)


    return response