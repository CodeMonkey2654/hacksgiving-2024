from fastapi import APIRouter, HTTPException
from ai.chat import ChatKnowledgeBase, ChatManager
from pydantic import BaseModel, Field
from typing import Dict, Any

router = APIRouter(
    prefix="",
    tags=["chat"]
)

# Initialize knowledge base and chat manager
knowledge_base = ChatKnowledgeBase()
chat_manager = ChatManager(knowledge_base)

class ChatRequest(BaseModel):
    message: str = Field(..., description="The message from the user")
    session_id: str = Field(..., description="The unique session identifier")
    interests: Dict[str, int] = Field(..., description="The user's interests")
    complexity: int = Field(..., description="The user's reading level")
    language: str = Field(..., description="The user's language")
    class Config:
        json_schema_extra = {
            "example": {
                "message": "Tell me about this exhibit",
                "session_id": "123e4567-e89b-12d3-a456-426614174000",
                "interests": {"science": 50, "history": 50},
                "complexity": 50,
                "language": "en"
            }
        }

@router.post("/chat")
async def chat_with_exhibit(
    chat_request: ChatRequest
) -> Dict[str, Any]:
    print(f"Received request: {chat_request}")  # Debug logging
    
    # Get or create chat session
    session = chat_manager.get_or_create_session(
        session_id=chat_request.session_id,
        interests=chat_request.interests,
        complexity=chat_request.complexity
    )
    
    # Get response from chat manager
    try:
        response = chat_manager.chat(
            session_id=chat_request.session_id,
            user_input=chat_request.message,
            language=chat_request.language
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    return {
        "response": response,
        "session": session
    }