from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    filepath = Column(String)
    filetype = Column(String)

class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    play_order = Column(String, default="asc")  
    playback_time = Column(Float, default=5.0) 
