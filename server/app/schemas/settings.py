from pydantic import BaseModel

class SettingsBase(BaseModel):
    play_order: str
    playback_time: float

class SettingsCreate(SettingsBase):
    pass

class Settings(SettingsBase):
    id: int

    class Config:
        orm_mode = True
