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

# Funcție pentru a crea setările implicite
def create_default_settings(db: Session):
    default_settings = models.Settings(play_order="asc", playback_time=5.0)
    db.add(default_settings)
    db.commit()
    db.refresh(default_settings)
    return default_settings

def get_media(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Media).offset(skip).limit(limit).all()

def get_media_by_id(db: Session, media_id: int):
    return db.query(models.Media).filter(models.Media.id == media_id).first()

def delete_media(db: Session, media_id: int):
    media = get_media_by_id(db, media_id)
    if media:
        db.delete(media)
        db.commit()

# CRUD functions for Settings
def get_settings(db: Session):
    return db.query(models.Settings).first()

def update_settings(db: Session, settings: schemas.SettingsCreate):
    db_settings = get_settings(db)
    if db_settings:
        db_settings.play_order = settings.play_order
        db_settings.playback_time = settings.playback_time
    else:
        db_settings = models.Settings(**settings.dict())
        db.add(db_settings)
    db.commit()
    db.refresh(db_settings)
    return db_settings
