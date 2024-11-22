from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./museum.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Topic(Base):
    __tablename__ = "topics"
    
    id = Column(String, primary_key=True)
    label = Column(String)
    icon = Column(String)
    color = Column(String)
    exhibits = relationship("Exhibit", back_populates="topic")

class Exhibit(Base):
    __tablename__ = "exhibits"
    
    id = Column(String, primary_key=True)
    title = Column(String)
    description = Column(String)
    image = Column(String)
    topic_id = Column(String, ForeignKey("topics.id"))
    details = Column(JSON)
    topic = relationship("Topic", back_populates="exhibits")

class Visit(Base):
    __tablename__ = "visits"
    
    id = Column(Integer, primary_key=True)
    user_id = Column(String)
    exhibit_id = Column(String, ForeignKey("exhibits.id"))
    timestamp = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    interests = Column(JSON)
    language = Column(String)
    reading_level = Column(String)

Base.metadata.create_all(bind=engine) 