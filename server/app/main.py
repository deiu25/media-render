from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.db.database import engine, SessionLocal, Base
from app.api import media, settings
from app.crud.settings import create_default_settings, get_settings 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def initialize_settings():
    with SessionLocal() as db:
        settings = get_settings(db)
        if not settings:
            create_default_settings(db)

initialize_settings()

if not os.path.exists("app/static/media"):
    os.makedirs("app/static/media")

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(media.router, prefix="/media", tags=["Media"])
app.include_router(settings.router, prefix="/settings", tags=["Settings"])
