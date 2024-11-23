from typing import Dict, List, Optional
from .agents import ConversationAgent, ExhibitContentManager

class ChatKnowledgeBase:
    """Manages knowledge base and agents for museum chat system"""
    def __init__(self):
        self.content_manager = ExhibitContentManager()
        self.conversation_agent = ConversationAgent()

class ChatManager:
    """Manages chat sessions and interactions with museum visitors"""
    def __init__(self, knowledge_base: ChatKnowledgeBase):
        self.knowledge_base = knowledge_base
        self.sessions = {}
    
    def get_or_create_session(self, session_id: str, interests: Dict[str, float], complexity: int) -> Dict:
        """Gets existing chat session or creates new one with user preferences"""
        if session_id not in self.sessions:
            self.sessions[session_id] = {
                'interests': interests,
                'complexity': complexity,
                'history': []
            }
        return self.sessions[session_id]
    
    def chat(self, session_id: str, user_input: str, language: str) -> str:
        """Process user input and generate contextual museum-focused response"""
        # Validate session exists
        session = self.sessions.get(session_id)
        if not session:
            raise ValueError("Chat session not found")
            
        # Generate initial response using conversation history
        try:
            initial_response = self.knowledge_base.conversation_agent.generate_response(
                query=user_input,
                chat_history=session['history']
            )
        except Exception as e:
            print(f"Response generation failed: {str(e)}")
            return "I apologize, but I'm having trouble understanding. Could you rephrase that?"
            
        # Enhance response with user preferences and translate if needed
        try:
            enhanced_response = self.knowledge_base.content_manager.process_exhibit(
                description=initial_response,
                interests=session['interests'],
                complexity=session['complexity'],
                language=language
            )
        except Exception as e:
            print(f"Response enhancement failed: {str(e)}")
            enhanced_response = initial_response
            
        # Update conversation history
        session['history'].append({
            'user': user_input,
            'assistant': enhanced_response or initial_response
        })
            
        return enhanced_response or initial_response