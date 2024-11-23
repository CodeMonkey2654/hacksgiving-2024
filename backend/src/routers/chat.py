from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
import database.crud as crud
from ai.chat import ChatKnowledgeBase, ChatManager
import json
from dependencies import get_db

router = APIRouter(
    prefix="/chat",
    tags=["chat"]
)

# Initialize knowledge base and chat manager
knowledge_base = ChatKnowledgeBase()
chat_manager = ChatManager(knowledge_base)

@router.post("/{user_id}/{session_id}")
def chat_with_exhibit(
    user_id: str, 
    session_id: str,
    message: str = Body(..., embed=True),
    db: Session = Depends(get_db)
):
    # Get user preferences
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Parse user interests
    interests = json.loads(user.interests)
    
    # Calculate complexity based on reading level
    complexity = {
        "advanced": 100,
        "intermediate": 50,
        "beginner": 25
    }.get(user.reading_level, 25)
    
    # Get or create chat session
    chat_manager.get_or_create_session(
        session_id=session_id,
        interests=interests,
        complexity=complexity
    )
    
    # Get response from chat manager
    try:
        response = chat_manager.chat(
            session_id=session_id,
            user_input=message,
            language=user.language
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    
    return {"response": response}