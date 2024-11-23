from pydantic import BaseModel
from typing import Dict, Any, Optional
from datetime import datetime

class TopicBase(BaseModel):
    label: str
    icon: str
    color: str

class TopicCreate(TopicBase):
    id: str

class Topic(TopicBase):
    id: str
    
    class Config:
        from_attributes = True

class ExhibitBase(BaseModel):
    id: str
    title: str
    description: str
    image: str
    details: Dict[str, Any]

class ExhibitCreate(ExhibitBase):
    pass

class Exhibit(ExhibitBase):
    class Config:
        orm_mode = True

class ExhibitTopicBase(BaseModel):
    exhibit_id: str
    topic_id: str
    relevance: float

class ExhibitTopicCreate(ExhibitTopicBase):
    pass

class ExhibitTopic(ExhibitTopicBase):
    
    class Config:
        from_attributes = True

class UserBase(BaseModel):
    interests: Dict[str, float]
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