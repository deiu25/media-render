from sqlalchemy import Column, Integer, String, Float
from app.db.database import Base

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    play_order = Column(String, default="asc")
    playback_time = Column(Float, default=5.0)
