from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import database.crud as crud
from database.schemas import Topic, TopicCreate
from dependencies import get_db

router = APIRouter(
    prefix="/topics",
    tags=["topics"]
)

@router.get("", response_model=List[Topic])
def get_topics(db: Session = Depends(get_db)):
    return crud.get_topics(db)

@router.post("", response_model=Topic)
def create_topic(topic: TopicCreate, db: Session = Depends(get_db)):
    return crud.create_topic(db, topic)

@router.put("/{topic_id}", response_model=Topic)
def update_topic(topic_id: str, topic: TopicCreate, db: Session = Depends(get_db)):
    return crud.update_topic(db, topic_id, topic)

@router.delete("/{topic_id}")
def delete_topic(topic_id: str, db: Session = Depends(get_db)):
    crud.delete_topic(db, topic_id)
    return {"status": "success"}