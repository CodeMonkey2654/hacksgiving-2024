from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
import database.crud as crud
from chat import ChatSession
import json
from dependencies import get_db

router = APIRouter(
    prefix="/api/chat",
    tags=["chat"]
)

chat_sessions = {}

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
    
    # Create new chat session if doesn't exist
    if session_id not in chat_sessions:
        interests = json.loads(user.interests)
        chat_sessions[session_id] = ChatSession(
            interests=interests,
            complexity=100 if user.reading_level == "advanced" else 50 if user.reading_level == "intermediate" else 25
        )
    
    # Get response from chat session
    response = chat_sessions[session_id].chat(
        user_input=message,
        language=user.language
    )
    
    return {
        "response": response
    }