from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import os

from . import crud, models, schemas, database

app = FastAPI()

# Configurare CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Creare structuri baze de date
models.Base.metadata.create_all(bind=database.engine)

# Montare fișiere statice
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

# Endpoint pentru a obține lista fișierelor media
@app.get("/media/", response_model=list[schemas.Media])
def get_media_files(db: Session = Depends(get_db)):
    return crud.get_media(db=db)

# Endpoint pentru a șterge un fișier media
@app.delete("/media/{file_id}", response_model=schemas.Media)
def delete_media_file(file_id: int, db: Session = Depends(get_db)):
    media = crud.get_media_by_id(db=db, media_id=file_id)
    if not media:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Șterge fișierul de pe disc
    file_path = f"app/static/media/{media.filename}"
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Șterge înregistrarea din baza de date
    crud.delete_media(db=db, media_id=file_id)
    return media
