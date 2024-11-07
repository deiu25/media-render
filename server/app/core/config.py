from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.crud import settings as crud_settings

def initialize_settings():
    with SessionLocal() as db:
        settings = crud_settings.get_settings(db)
        if not settings:
            crud_settings.create_default_settings(db)
