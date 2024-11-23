from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
import google.generativeai as genai
import os
from langdetect import detect
from typing import Dict

GUIDE_PROMPT = """
You are an AI museum guide tasked with explaining exhibits.
When explaining an exhibit, consider:
    - The visitor's interests: {interests} (scale of 0-100 for each topic)
    - The desired complexity level: {complexity} (0-100 scale)

Adjust your explanations to:
    1. Focus more on aspects related to topics with higher interest levels
    2. Match the complexity level - use simpler terms for lower complexity and more technical language for higher complexity
    3. Make connections between the exhibit and the visitor's strongest interests where relevant
    4. Scale the depth of scientific detail based on the complexity level

Always aim to be engaging while maintaining scientific accuracy at the appropriate level."""

JUDGE_PROMPT = """
You are a judge that determines whether a response is accurate and engaging. 
Your job is to determine whether a response is factually accurate or not.
If it is accurate, respond with 'accurate'. If it is not accurate, respond with 'inaccurate'.
Do not respond with anything else."""

TRANSLATION_PROMPT = """
Please translate the following text from {source_lang} to {target_lang}.

Important translation guidelines:
- Maintain the same level of formality and tone
- Preserve any technical or scientific terminology
- Keep the same paragraph structure and formatting
- Ensure cultural context and idioms are appropriately adapted
- Maintain any exhibit-specific terminology

Text to translate:
{text}

Please provide only the translated text without any additional commentary."""

class ChatSession:
    def __init__(self, interests: Dict[str, str], complexity: int = 50):
        self.conversation_history = []
        self.system_prompt = SystemMessage(content=GUIDE_PROMPT.format(
            interests=interests,
            complexity=complexity
        ))
        self.judge_system_prompt = SystemMessage(content=JUDGE_PROMPT)
        self.llm = ChatOllama(model="llama3.1:latest", temperature=0.7)
        self.judge = ChatOllama(model="llama3.1:latest", temperature=0)

        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        self.translator = genai.GenerativeModel('gemini1.5-pro')
        
    def chat(self, user_input: str, language: str = 'en') -> str:
        # Add user message to history
        self.conversation_history.append(HumanMessage(content=user_input))
        
        # Get valid response from LLM
        while True:
            messages = [self.system_prompt] + self.conversation_history
            response = self.llm.invoke(messages)
            
            # Validate response with judge
            judge_messages = [
                self.judge_system_prompt,
                HumanMessage(content=response.content)
            ]
            judgment = self.judge.invoke(judge_messages)
            
            if judgment.content.strip().lower() == 'accurate':
                break
            
            # Remove invalid response from history and try again
            if len(self.conversation_history) > 0:
                self.conversation_history.pop()
        
        # Translate if needed
        try:
            detected_lang = detect(response.content)
            if detected_lang != language:
                translation_prompt = TRANSLATION_PROMPT.format(
                    source_lang=detected_lang,
                    target_lang=language,
                    text=response.content
                )
                
                translated = self.translator.generate_content(translation_prompt)
                response = AIMessage(content=translated.text)
        except:
            pass
            
        self.conversation_history.append(response)
        return response.content
