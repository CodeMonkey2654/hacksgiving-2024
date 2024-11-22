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
    details: Dict[str, str]

class ExhibitCreate(ExhibitBase):
    pass

class Exhibit(ExhibitBase):
    id: str
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    interests: Dict[str, int]
    language: str
    reading_level: str

class UserCreate(UserBase):
    id: str

class User(UserBase):
    id: str
    
    class Config:
        from_attributes = True

class VisitCreate(BaseModel):
    user_id: str
    exhibit_id: str

class Visit(VisitCreate):
    id: int
    timestamp: datetime
    
    class Config:
        from_attributes = True 