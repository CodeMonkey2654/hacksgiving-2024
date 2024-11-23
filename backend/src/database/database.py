from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import json
import uuid
from .base import Base
from .models import Topic

SQLALCHEMY_DATABASE_URL = "sqlite:///./museum.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

# Initialize database with some sample data
def init_db():
    db = SessionLocal()
    
    # Check if database is already initialized
    if db.query(Topic).first() is not None:
        db.close()
        return

    # Create sample topics
    topics = [
        Topic(
            id=str(uuid.uuid4()),
            label="Physics",
            icon="⚡",
            color="#FF4444"
        ),
        Topic(
            id=str(uuid.uuid4()),
            label="Chemistry",
            icon="🧪",
            color="#44FF44"
        ),
        Topic(
            id=str(uuid.uuid4()),
            label="Astronomy",
            icon="🌟",
            color="#4444FF"
        )
    ]
    
    for topic in topics:
        db.add(topic)
    
    db.commit()
    db.close()

init_db()