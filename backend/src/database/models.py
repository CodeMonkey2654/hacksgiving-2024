from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func
from .base import Base

class Topic(Base):
    __tablename__ = "topics"
    
    id = Column(String, primary_key=True)
    label = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    color = Column(String, nullable=False)

class Exhibit(Base):
    __tablename__ = "exhibits"
    
    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=False)
    topic_id = Column(String, ForeignKey("topics.id"), nullable=False)
    details = Column(JSON, nullable=True)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    interests = Column(JSON, nullable=True)
    language = Column(String, nullable=False)
    reading_level = Column(String, nullable=False)

class Visit(Base):
    __tablename__ = "visits"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    exhibit_id = Column(String, ForeignKey("exhibits.id"), nullable=False)
    timestamp = Column(DateTime, nullable=False, server_default=func.now())
