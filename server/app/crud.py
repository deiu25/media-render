from sqlalchemy.orm import Session
from . import models, schemas

def create_media(db: Session, media: schemas.MediaCreate, filepath: str):
    db_media = models.Media(
        filename=media.filename, filetype=media.filetype, filepath=filepath
    )
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

def get_media(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Media).offset(skip).limit(limit).all()

def get_media_by_id(db: Session, media_id: int):
    return db.query(models.Media).filter(models.Media.id == media_id).first()

def delete_media(db: Session, media_id: int):
    media = get_media_by_id(db, media_id)
    if media:
        db.delete(media)
        db.commit()
