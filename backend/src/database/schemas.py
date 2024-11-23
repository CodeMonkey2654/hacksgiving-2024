from pydantic import BaseModel
from typing import Dict, List, Optional
from datetime import datetime

class TopicBase(BaseModel):
    label: str
    icon: str
    color: str

class TopicCreate(TopicBase):
    pass

class Topic(TopicBase):
    id: str
    
    class Config:
        from_attributes = True

class ExhibitBase(BaseModel):
    title: str
    description: str
    image: str
    topic_id: str
    details: str  # Changed from Dict to str

class ExhibitCreate(ExhibitBase):
    pass

class Exhibit(ExhibitBase):
    id: str
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    interests: str
    language: str
    reading_level: str

class UserCreate(UserBase):
    id: str

class User(UserBase):
    id: str
    
    class Config:
        from_attributes = True

class VisitBase(BaseModel):
    user_id: str
    session_id: str
    page_path: str
    timestamp: datetime

class VisitCreate(VisitBase):
    pass

class Visit(VisitBase):
    id: int

    class Config:
        from_attributes = True