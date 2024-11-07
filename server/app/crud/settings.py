from sqlalchemy.orm import Session
from app.models.settings import Settings
from app.schemas.settings import SettingsCreate

def create_default_settings(db: Session):
    default_settings = Settings(play_order="asc", playback_time=1.0)
    db.add(default_settings)
    db.commit()
    db.refresh(default_settings)
    return default_settings

def get_settings(db: Session):
    return db.query(Settings).first()

def update_settings(db: Session, settings: SettingsCreate):
    db_settings = get_settings(db)
    if db_settings:
        db.query(Settings).filter(Settings.id == db_settings.id).update({
            "play_order": settings.play_order,
            "playback_time": settings.playback_time
        })
    else:
        db_settings = Settings(**settings.model_dump())
        db.add(db_settings)
    db.commit()
    db.refresh(db_settings)
    return db_settings
