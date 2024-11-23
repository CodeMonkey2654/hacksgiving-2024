from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import json
from database.schemas import Exhibit
from database.crud import get_user
from ai.recommedation import ExhibitRecommender
from ai.knowledge_base import ExhibitKnowledgeBase
from dependencies import get_db

router = APIRouter(
    prefix="/recommendations",
    tags=["recommendations"]
)

# Initialize knowledge base and recommender
knowledge_base = ExhibitKnowledgeBase()
recommender = ExhibitRecommender(knowledge_base)

@router.get("/user/{user_id}", response_model=List[Exhibit])
def get_recommendations(
    user_id: str,
    k: int = 3,
    db: Session = Depends(get_db)
):
    # Get user and their interests
    user = get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Parse user interests from JSON string
    try:
        interests = json.loads(user.interests)
    except:
        interests = {}
    
    # Get recommendations using the ExhibitRecommender
    recommended_exhibits = recommender.get_next_exhibits(
        interests=interests,
        visited_exhibits=[],  # No visited exhibits tracking
        k=k
    )
    
    return recommended_exhibits