import json
from database.database import SessionLocal, engine
from database.base import Base
from database.crud import create_topic, create_exhibit, create_exhibit_topic
from database.schemas import TopicCreate, ExhibitCreate, ExhibitTopicCreate
from database.models import Topic, Exhibit, ExhibitTopic
def init_db():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if database is already initialized
    if db.query(Topic).first() is not None:
        db.close()
        return
    
    # Load JSON data
    with open('local-scripts/data_gen/topics.json') as f:
        topics_data = json.load(f)
    
    with open('local-scripts/data_gen/exhibits.json') as f:
        exhibits_data = json.load(f)
        
    with open('local-scripts/data_gen/exhibit_topics.json') as f:
        exhibit_topics_data = json.load(f)
    
    # Create topics
    topic_ids = {}
    for topic in topics_data:
        topic_create = TopicCreate(
            id=topic['id'],
            label=topic['label'],
            icon=topic['icon'],
            color=topic['color']
        )
        db_topic = create_topic(db, topic_create)
        topic_ids[topic['id']] = db_topic.id
    
    # Create exhibits with proper JSON handling
    for exhibit in exhibits_data:
        try:
            details = json.loads(exhibit['details'])
        except (json.JSONDecodeError, TypeError, KeyError):
            details = {}
            
        exhibit_create = ExhibitCreate(
            id=exhibit['id'],
            title=exhibit['title'],
            description=exhibit['description'],
            image=exhibit['image'],
            details=details
        )
        create_exhibit(db, exhibit_create)
    
    # Create exhibit-topic relationships
    for exhibit_topic in exhibit_topics_data:
        exhibit_topic_create = ExhibitTopicCreate(
            exhibit_id=exhibit_topic['exhibit_id'],
            topic_id=exhibit_topic['topic_id'],
            relevance=exhibit_topic['relevance']
        )
        create_exhibit_topic(db, exhibit_topic_create)
    
    db.close()

if __name__ == "__main__":
    init_db()