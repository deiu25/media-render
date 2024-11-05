#schemas
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

class SettingsBase(BaseModel):
    play_order: str
    playback_time: float

class SettingsCreate(SettingsBase):
    pass

class Settings(SettingsBase):
    id: int

    class Config:
        from_attributes = True  
