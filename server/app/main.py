#main.py
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os

from . import crud, models, schemas, database
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=database.engine)

def initialize_settings(db: Session):
    settings = crud.get_settings(db)
    if not settings:
        # Creează setările implicite
        crud.create_default_settings(db)

with database.SessionLocal() as db:
    initialize_settings(db)

if not os.path.exists("app/static/media"):
    os.makedirs("app/static/media")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/upload/", response_model=list[schemas.Media])
async def upload_files(
    files: list[UploadFile] = File(...), db: Session = Depends(get_db)
):
    uploaded_files = []
    for file in files:
        file_location = f"app/static/media/{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(await file.read())
        media = schemas.MediaCreate(
            filename=file.filename, filetype=file.content_type
        )
        uploaded_file = crud.create_media(db=db, media=media, filepath=file.filename)
        uploaded_files.append(uploaded_file)
    return uploaded_files

@app.get("/media/", response_model=list[schemas.Media])
def get_media_files(db: Session = Depends(get_db)):
    return crud.get_media(db=db)

@app.delete("/media/{file_id}", response_model=schemas.Media)
def delete_media_file(file_id: int, db: Session = Depends(get_db)):
    media = crud.get_media_by_id(db=db, media_id=file_id)
    if not media:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_path = f"app/static/media/{media.filename}"
    if os.path.exists(file_path):
        os.remove(file_path)
    
    crud.delete_media(db=db, media_id=file_id)
    return media

# Endpoint nou pentru actualizarea ordinii imaginilor
@app.post("/media/reorder")
def reorder_media(order: List[int], db: Session = Depends(get_db)):
    crud.update_media_order(db, order)
    return {"status": "Order updated successfully"}

# Endpoint pentru a obține setările
@app.get("/settings/", response_model=schemas.Settings)
def get_settings(db: Session = Depends(get_db)):
    settings = crud.get_settings(db=db)
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings

# Endpoint pentru a actualiza setările
@app.put("/settings/", response_model=schemas.Settings)
def update_settings(settings: schemas.SettingsCreate, db: Session = Depends(get_db)):
    return crud.update_settings(db=db, settings=settings)
