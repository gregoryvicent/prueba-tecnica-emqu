from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from login.router import login_router
from machines.router import machines_router

app = FastAPI()

origins = [
    'http://localhost:5173',
    'http://localhost:4173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class User(BaseModel):
    name: str

app.include_router(login_router)
app.include_router(machines_router)
