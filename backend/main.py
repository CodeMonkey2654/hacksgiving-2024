from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import crud
from database import engine, Base
from schemas import Topic, TopicCreate, Exhibit, ExhibitCreate, User, UserCreate, Visit, VisitCreate
from dependencies import get_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Topics endpoints
@app.get("/api/topics", response_model=List[Topic])
def get_topics(db: Session = Depends(get_db)):
    return crud.get_topics(db)

@app.post("/api/topics", response_model=Topic)
def create_topic(topic: TopicCreate, db: Session = Depends(get_db)):
    return crud.create_topic(db, topic)

@app.put("/api/topics/{topic_id}", response_model=Topic)
def update_topic(topic_id: str, topic: TopicCreate, db: Session = Depends(get_db)):
    return crud.update_topic(db, topic_id, topic)

@app.delete("/api/topics/{topic_id}")
def delete_topic(topic_id: str, db: Session = Depends(get_db)):
    crud.delete_topic(db, topic_id)
    return {"status": "success"}

# Exhibits endpoints
@app.get("/api/exhibits", response_model=List[Exhibit])
def get_exhibits(db: Session = Depends(get_db)):
    return crud.get_exhibits(db)

@app.get("/api/exhibits/{exhibit_id}", response_model=Exhibit)
def get_exhibit(exhibit_id: str, db: Session = Depends(get_db)):
    exhibit = crud.get_exhibit(db, exhibit_id)
    if exhibit is None:
        raise HTTPException(status_code=404, detail="Exhibit not found")
    return exhibit

@app.post("/api/exhibits", response_model=Exhibit)
def create_exhibit(exhibit: ExhibitCreate, db: Session = Depends(get_db)):
    return crud.create_exhibit(db, exhibit)

@app.put("/api/exhibits/{exhibit_id}", response_model=Exhibit)
def update_exhibit(exhibit_id: str, exhibit: ExhibitCreate, db: Session = Depends(get_db)):
    return crud.update_exhibit(db, exhibit_id, exhibit)

@app.delete("/api/exhibits/{exhibit_id}")
def delete_exhibit(exhibit_id: str, db: Session = Depends(get_db)):
    crud.delete_exhibit(db, exhibit_id)
    return {"status": "success"}

# Users endpoints
@app.post("/api/users", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@app.get("/api/users/{user_id}", response_model=User)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Visits endpoints
@app.post("/api/visits", response_model=Visit)
def record_visit(visit: VisitCreate, db: Session = Depends(get_db)):
    return crud.create_visit(db, visit)

@app.get("/api/users/{user_id}/visits", response_model=List[Visit])
def get_user_visits(user_id: str, db: Session = Depends(get_db)):
    return crud.get_user_visits(db, user_id)