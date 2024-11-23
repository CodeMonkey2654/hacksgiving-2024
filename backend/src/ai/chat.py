from typing import Dict, List
from .agents import ConversationAgent, ExhibitContentManager

class ChatKnowledgeBase:
    def __init__(self):
        self.content_manager = ExhibitContentManager()
        self.conversation_agent = ConversationAgent()

class ChatManager:
    def __init__(self, knowledge_base: ChatKnowledgeBase):
        self.knowledge_base = knowledge_base
        self.sessions = {}
    
    def get_or_create_session(self, session_id: str, interests: Dict[str, float], complexity: int):
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                'interests': interests,
                'complexity': complexity,
                'history': []
            }
        return self.sessions[session_id]
    
    def chat(self, session_id: str, user_input: str, language: str) -> str:
        session = self.sessions.get(session_id)
        if not session:
            raise ValueError("Session not found")
            
        # First try to get relevant search results
        search_results = []
        try:
            search_results = self.knowledge_base.conversation_agent.generate_response(user_input, session['history'])
        except Exception as e:
            print(f"Search failed: {str(e)}")
            
        # Generate conversational response using search results and chat history
        response = self.knowledge_base.search_agent.generate_response(
            query=user_input,
            search_results=search_results,
            chat_history=session['history']
        )
        
        # Process response through content manager for personalization and translation
        enhanced_response = self.knowledge_base.content_manager.process_exhibit(
            description=response,
            interests=session['interests'],
            complexity=session['complexity'],
            language=language
        )
        
        if enhanced_response is None:
            enhanced_response = response
            
        # Store interaction in history
        session['history'].append({
            'user': user_input,
            'assistant': enhanced_response
        })
            
        return enhanced_response