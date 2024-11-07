from sqlalchemy import Column, Integer, String
from app.db.database import Base

class Media(Base):
    __tablename__ = "media"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    filepath = Column(String)
    filetype = Column(String)
    display_order = Column(Integer, default=0)
