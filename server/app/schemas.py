from pydantic import BaseModel

class MediaBase(BaseModel):
    filename: str
    filetype: str

class MediaCreate(MediaBase):
    pass

class Media(MediaBase):
    id: int
    filepath: str  

    class Config:
        from_attributes = True  
