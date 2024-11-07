from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from pathlib import Path

from app.schemas import media as schemas
from app.crud import media as crud
from app.db.database import get_db

# Define the media folder where files are saved
MEDIA_FOLDER = Path("app/static/media")
MEDIA_FOLDER.mkdir(parents=True, exist_ok=True)  # Ensure the folder exists

router = APIRouter()

@router.post("/upload/", response_model=List[schemas.Media])
async def upload_files(files: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    """Endpoint to upload files."""
    uploaded_files = []
    for file in files:
        # Check if filename and content_type are None
        if not file.filename:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Filename is missing")
        if not file.content_type:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="File content type is missing")

        # Save file to the defined media folder
        file_path = MEDIA_FOLDER / file.filename 
        try:
            with open(file_path, "wb") as f:
                f.write(await file.read())
            # Save file metadata to the database
            media_data = schemas.MediaCreate(filename=file.filename, filetype=file.content_type)
            uploaded_file = crud.create_media(db=db, media=media_data, filepath=file.filename)
            uploaded_files.append(uploaded_file)
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
    return uploaded_files

@router.get("/", response_model=List[schemas.Media])
def get_media_files(db: Session = Depends(get_db)):
    """Endpoint to retrieve media file metadata."""
    return crud.get_media(db=db)

@router.delete("/{file_id}", response_model=schemas.Media)
def delete_media_file(file_id: int, db: Session = Depends(get_db)):
    """Endpoint to delete a specific media file."""
    media = crud.get_media_by_id(db=db, media_id=file_id)
    if not media:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not found")
    
    file_path = MEDIA_FOLDER / media.filename
    if file_path.exists():
        file_path.unlink()
    
    crud.delete_media(db=db, media_id=file_id)
    return media

@router.post("/reorder")
def reorder_media(order: List[int], db: Session = Depends(get_db)):
    """Endpoint to reorder media files."""
    try:
        crud.update_media_order(db=db, order=order)
        return {"status": "Order updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
