from sqlalchemy.orm import Session
from src.database import SessionLocal, engine, Base
from src.crud import create_topic, create_exhibit
from src.schemas import TopicCreate, ExhibitCreate
from src.models import Topic
import uuid
import json

def init_db():
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if database is already initialized
    if db.query(Topic).first() is not None:
        db.close()
        return
    
    # Create initial topics
    topics = [
        TopicCreate(
            label="Physics",
            icon="⚛️",
            color="#60A5FA"
        ),
        TopicCreate(
            label="Chemistry", 
            icon="🧪",
            color="#C084FC"
        ),
        TopicCreate(
            label="Biology",
            icon="🧬", 
            color="#F472B6"
        ),
        TopicCreate(
            label="Astronomy",
            icon="🔭",
            color="#818CF8"
        )
    ]
    
    topic_ids = {}
    for topic in topics:
        db_topic = create_topic(db, topic)
        topic_ids[topic.label] = db_topic.id
    
    # Create initial exhibits
    exhibits = [
        ExhibitCreate(
            title="Quantum Mysteries",
            description="Explore the fascinating world of quantum mechanics",
            image="⚛️",
            topic_id=topic_ids["Physics"],
            details=json.dumps({
                "elementary": "Learn about tiny particles that make up everything!",
                "middle-school": "Discover the basics of quantum mechanics",
                "high-school": "Explore wave-particle duality and quantum states",
                "college": "Study quantum mechanics mathematics and principles",
                "expert": "Deep dive into quantum field theory"
            })
        ),
        ExhibitCreate(
            title="Chemical Reactions",
            description="Witness spectacular chemical transformations",
            image="🧪",
            topic_id=topic_ids["Chemistry"],
            details=json.dumps({
                "elementary": "Watch amazing color changes and bubbles!",
                "middle-school": "Learn about different types of reactions",
                "high-school": "Study reaction rates and equilibrium",
                "college": "Explore reaction mechanisms and kinetics",
                "expert": "Advanced topics in physical chemistry"
            })
        )
    ]
    
    for exhibit in exhibits:
        create_exhibit(db, exhibit)
    
    db.close()

if __name__ == "__main__":
    init_db()