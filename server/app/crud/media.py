from sqlalchemy.orm import Session
from typing import List
from app.models.media import Media 
from app.schemas.media import MediaCreate  

def create_media(db: Session, media: MediaCreate, filepath: str):
    db_media = Media(
        filename=media.filename, filetype=media.filetype, filepath=filepath
    )
    db.add(db_media)
    db.commit()
    db.refresh(db_media)
    return db_media

def get_media(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Media).order_by(Media.display_order).offset(skip).limit(limit).all()

def get_media_by_id(db: Session, media_id: int):
    return db.query(Media).filter(Media.id == media_id).first()

def delete_media(db: Session, media_id: int):
    media = get_media_by_id(db, media_id)
    if media:
        db.delete(media)
        db.commit()

def update_media_order(db: Session, order: List[int]):
    for display_order, media_id in enumerate(order):
        db.query(Media).filter(Media.id == media_id).update({
            "display_order": display_order
        })
    db.commit()
