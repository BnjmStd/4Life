import logging
import os

from logtail import LogtailHandler

token = 'ASDASD'
# get loggin


logger = logging.getLogger()


# create formatter
formatter = logging.Formatter(
    fmt="%(asctime)s - %(levelname)s - %(message)s"
)

# create handlers

stream_handler = logging.StreamHandler(os.fdopen(1, 'w'))
file_handler = logging.FileHandler('app.log')
better_Stack_handler = LogtailHandler(source_token=token)
# sett formatter

stream_handler.setFormatter(formatter)
file_handler.setFormatter(formatter)


# add handlers to the logger
logger.handlers = [stream_handler,file_handler, better_Stack_handler]


logger.setLevel(logging.INFO)