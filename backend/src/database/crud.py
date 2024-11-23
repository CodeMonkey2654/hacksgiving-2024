from sqlalchemy.orm import Session
from .models import Topic, Exhibit, ExhibitTopic, User, Visit
from .schemas import TopicCreate, ExhibitCreate, ExhibitTopicCreate, UserCreate, VisitCreate
from fastapi import HTTPException
import uuid
import json

def get_topics(db: Session):
    return db.query(Topic).all()

def create_topic(db: Session, topic: TopicCreate):
    topic_data = topic.dict()
    topic_id = topic.id if topic.id else str(uuid.uuid4())
    db_topic = Topic(
        id=topic_id,
        label=topic_data['label'],
        icon=topic_data['icon'], 
        color=topic_data['color']
    )
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    return db_topic

def update_topic(db: Session, topic_id: str, topic: TopicCreate):
    db_topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not db_topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    for key, value in topic.dict().items():
        setattr(db_topic, key, value)
    
    db.commit()
    db.refresh(db_topic)
    return db_topic

def delete_topic(db: Session, topic_id: str):
    db_topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not db_topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    
    db.delete(db_topic)
    db.commit()

def get_exhibits(db: Session):
    exhibits = db.query(Exhibit).all()
    for exhibit in exhibits:
        try:
            exhibit.details = json.loads(exhibit.details)
        except (json.JSONDecodeError, TypeError):
            exhibit.details = {}
    return exhibits

def get_exhibit(db: Session, exhibit_id: str):
    exhibit = db.query(Exhibit).filter(Exhibit.id == exhibit_id).first()
    if exhibit:
        try:
            exhibit.details = json.loads(exhibit.details)
        except (json.JSONDecodeError, TypeError):
            exhibit.details = {}
    return exhibit

def create_exhibit(db: Session, exhibit: ExhibitCreate):
    details_json = json.dumps(exhibit.details) if exhibit.details else "{}"
    db_exhibit = Exhibit(
        id=str(uuid.uuid4()),
        title=exhibit.title,
        description=exhibit.description,
        image=exhibit.image,
        details=details_json
    )
    db.add(db_exhibit)
    db.commit()
    db.refresh(db_exhibit)
    db_exhibit.details = json.loads(db_exhibit.details)
    return db_exhibit

def update_exhibit(db: Session, exhibit_id: str, exhibit: ExhibitCreate):
    db_exhibit = db.query(Exhibit).filter(Exhibit.id == exhibit_id).first()
    if not db_exhibit:
        raise HTTPException(status_code=404, detail="Exhibit not found")
    
    for key, value in exhibit.dict().items():
        setattr(db_exhibit, key, value)
    
    db.commit()
    db.refresh(db_exhibit)
    return db_exhibit

def delete_exhibit(db: Session, exhibit_id: str):
    db_exhibit = db.query(Exhibit).filter(Exhibit.id == exhibit_id).first()
    if not db_exhibit:
        raise HTTPException(status_code=404, detail="Exhibit not found")
    
    db.delete(db_exhibit)
    db.commit()

def get_exhibit_topics(db: Session):
    return db.query(ExhibitTopic).all()

def get_exhibit_topic(db: Session, exhibit_id: str, topic_id: str):
    return db.query(ExhibitTopic).filter(
        ExhibitTopic.exhibit_id == exhibit_id,
        ExhibitTopic.topic_id == topic_id
    ).first()

def create_exhibit_topic(db: Session, exhibit_topic: ExhibitTopicCreate):
    db_exhibit_topic = ExhibitTopic(**exhibit_topic.dict())
    db.add(db_exhibit_topic)
    db.commit()
    db.refresh(db_exhibit_topic)
    return db_exhibit_topic

def delete_exhibit_topic(db: Session, exhibit_id: str, topic_id: str):
    db_exhibit_topic = get_exhibit_topic(db, exhibit_id, topic_id)
    if not db_exhibit_topic:
        raise HTTPException(status_code=404, detail="Exhibit-Topic relationship not found")
    
    db.delete(db_exhibit_topic)
    db.commit()

def get_users(db: Session):
    return db.query(User).all()

def get_user(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user: UserCreate):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: str, user: UserCreate):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    for key, value in user.dict().items():
        setattr(db_user, key, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: str):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()

def get_visits(db: Session):
    return db.query(Visit).all()

def get_visit(db: Session, visit_id: int):
    return db.query(Visit).filter(Visit.id == visit_id).first()

def create_visit(db: Session, visit: VisitCreate):
    db_visit = Visit(**visit.dict())
    db.add(db_visit)
    db.commit()
    db.refresh(db_visit)
    return db_visit

def delete_visit(db: Session, visit_id: int):
    db_visit = db.query(Visit).filter(Visit.id == visit_id).first()
    if not db_visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    
    db.delete(db_visit)
    db.commit()