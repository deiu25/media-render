import os
from fastapi import UploadFile, HTTPException, status

MEDIA_FOLDER = "app/static/media"

def save_file(file: UploadFile) -> str:
    """Saves the file to the media directory and returns the full file path."""
    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Filename is missing")

    file_location = os.path.join(MEDIA_FOLDER, file.filename) 
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    return file_location

def delete_file_if_exists(filename: str) -> bool:
    """Deletes the file if it exists in the media directory."""
    file_path = os.path.join(MEDIA_FOLDER, filename)
    if os.path.exists(file_path):
        os.remove(file_path)
        return True
    return False
