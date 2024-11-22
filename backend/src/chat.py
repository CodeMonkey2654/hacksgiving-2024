from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
import google.generativeai as genai
import os
from langdetect import detect

class ChatSession:
    def __init__(self):
        self.conversation_history = []
        self.system_prompt = SystemMessage(content="You are a helpful AI assistant.")
        self.llm = ChatOllama(model="llama3.1:latest", temperature=0.7)
        
        # Initialize Gemini for translations if needed
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        self.translator = genai.GenerativeModel('gemini1.5-pro')
        
    def chat(self, user_input: str) -> str:
        # Add user message to history
        self.conversation_history.append(HumanMessage(content=user_input))
        
        # Get response from LLM
        messages = [self.system_prompt] + self.conversation_history
        response = self.llm.invoke(messages)
        
        # Check if response is not in English
        try:
            if detect(response.content) != 'en':
                # Translate to English using Gemini
                prompt = f"Translate this text to English: {response.content}"
                translated = self.translator.generate_content(prompt)
                response = AIMessage(content=translated.text)
        except:
            # If language detection fails, keep original response
            pass
            
        # Add response to history
        self.conversation_history.append(response)
        
        return response.content

class ChatInterface:
    def __init__(self):
        self.session = ChatSession()
        
    def start(self):
        print("Chat started. Type 'quit' to exit.")
        
        while True:
            user_input = input("\nYou: ").strip()
            
            if user_input.lower() == 'quit':
                print("Goodbye!")
                break
                
            try:
                response = self.session.chat(user_input)
                print(f"\nAssistant: {response}")
            except Exception as e:
                print(f"\nError: {str(e)}")

if __name__ == "__main__":
    chat_interface = ChatInterface()
    chat_interface.start()
