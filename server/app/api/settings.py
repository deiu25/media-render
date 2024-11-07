from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schemas import settings as schemas
from app.crud import settings as crud
from app.db.database import get_db

router = APIRouter()

@router.get("/", response_model=schemas.Settings)
def get_settings(db: Session = Depends(get_db)):
    settings = crud.get_settings(db=db)
    if not settings:
        raise HTTPException(status_code=404, detail="Settings not found")
    return settings

@router.put("/", response_model=schemas.Settings)
def update_settings(settings: schemas.SettingsCreate, db: Session = Depends(get_db)):
    return crud.update_settings(db=db, settings=settings)
