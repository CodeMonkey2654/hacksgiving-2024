from database.database import SessionLocal, engine
from database.base import Base
from database.crud import create_topic, create_exhibit
from database.schemas import TopicCreate, ExhibitCreate
from database.models import Topic

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
            details="Quantum mechanics is a fundamental theory in physics that describes nature at the atomic and subatomic scales. Through interactive demonstrations, visitors can learn about wave-particle duality, quantum superposition, and the strange behavior of particles at the quantum level."
        ),
        ExhibitCreate(
            title="Chemical Reactions",
            description="Witness spectacular chemical transformations",
            image="🧪",
            topic_id=topic_ids["Chemistry"],
            details="Experience the excitement of chemical reactions firsthand. Watch as substances combine to create new compounds, releasing energy in the form of light, heat, or gas. Learn about reaction types, catalysts, and the principles of chemical bonding."
        )
    ]
    
    for exhibit in exhibits:
        create_exhibit(db, exhibit)
    
    db.close()

if __name__ == "__main__":
    init_db()