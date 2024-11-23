from sqlalchemy.orm import Session
from .models import Topic, Exhibit, User, Visit
from .schemas import TopicCreate, ExhibitCreate, UserCreate, VisitCreate
from fastapi import HTTPException
import uuid

def get_topics(db: Session):
    return db.query(Topic).all()

def create_topic(db: Session, topic: TopicCreate):
    db_topic = Topic(id=str(uuid.uuid4()), **topic.dict())
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
    return db.query(Exhibit).all()

def get_exhibit(db: Session, exhibit_id: str):
    return db.query(Exhibit).filter(Exhibit.id == exhibit_id).first()

def create_exhibit(db: Session, exhibit: ExhibitCreate):
    db_exhibit = Exhibit(
        id=str(uuid.uuid4()),
        title=exhibit.title,
        description=exhibit.description,
        image=exhibit.image,
        topic_id=exhibit.topic_id,
        details=exhibit.details
    )
    db.add(db_exhibit)
    db.commit()
    db.refresh(db_exhibit)
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