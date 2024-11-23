from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from routers import topics_router, exhibits_router, user_router, visits_router, chat_router, recommendations_router
from dotenv import load_dotenv
import json
import argparse
from database.database import SessionLocal, engine
from database.crud import create_topic, create_exhibit, create_exhibit_topic
from database.schemas import TopicCreate, ExhibitCreate, ExhibitTopicCreate
from database.base import Base

load_dotenv()

# Parse command line arguments
parser = argparse.ArgumentParser()
parser.add_argument('--rewrite', action='store_true', help='Wipe and rewrite the database')
args = parser.parse_args()

if args.rewrite:
    # Drop all tables
    Base.metadata.drop_all(bind=engine)
    # Recreate tables
    Base.metadata.create_all(bind=engine)

    # Load JSON data
    with open('../../local-scripts/data_gen/exhibit_topics.json') as f:
        exhibit_topics_data = json.load(f)
        
    with open('../../local-scripts/data_gen/exhibits.json') as f:
        exhibits_data = json.load(f)
        
    with open('../../local-scripts/data_gen/topics.json') as f:
        topics_data = json.load(f)

    # Insert data into database
    db = SessionLocal()

    # Create topics
    for topic in topics_data:
        topic_create = TopicCreate(
            id=topic['id'],
            label=topic['label'],
            icon=topic['icon'],
            color=topic['color']
        )
        create_topic(db, topic_create)

    # Create exhibits
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

app = FastAPI(
    title="Hacksgiving 2024 API", 
    description="API for the Hacksgiving 2024 Discovery World",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return RedirectResponse(url="/docs")

@app.get("/health")
def health():
    return {"status": "ok"}

# Include routers
app.include_router(topics_router)
app.include_router(exhibits_router)
app.include_router(user_router)
app.include_router(visits_router)
app.include_router(chat_router)
app.include_router(recommendations_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)