from typing import Dict, Optional, Tuple, List
from llama_index.llms.openai import OpenAI
from llama_index.llms.gemini import Gemini
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import FunctionTool
from database.crud import get_exhibit_by_title
from database.database import SessionLocal
import json
from functools import partial
import os
from dotenv import load_dotenv

load_dotenv()

class ConversationAgent:
    def __init__(self):
        self.llm = OpenAI(model="gpt-4o-mini", temperature=0.7)
        self.agent = self._create_agent()

    def _create_agent(self) -> ReActAgent:
        """Create ReAct agent with conversation tools"""
        tools = [
            FunctionTool.from_defaults(
                fn=self.generate_response,
                name="generate_response", 
                description="Generates a conversational response using chat history"
            )
        ]
        return ReActAgent.from_tools(tools, llm=self.llm, verbose=True)

    def generate_response(self, query: str, chat_history: List[Dict] = None) -> str:
        """Generates a conversational response using chat history"""
        prompt = self._build_response_prompt(query, chat_history)
        try:
            response = self.llm.complete(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Response generation failed: {str(e)}")
            return "I'm sorry, I had trouble generating a response. Could you try rephrasing?"

    def _build_response_prompt(self, query: str, chat_history: List[Dict] = None) -> str:
        history_str = ""
        if chat_history:
            history_str = "Chat history:\n" + "\n".join([
                f"User: {msg['user']}\nAssistant: {msg['assistant']}"
                for msg in chat_history[-3:]  # Include last 3 messages for context
            ])

        return f"""You are a knowledgeable and engaging museum guide.
Using the chat history provided, generate a natural response that:
1. Directly addresses the user's query
2. Maintains a consistent and friendly tone
3. Acknowledges any relevant context from chat history
4. Focuses on museum and science-related topics

{history_str}

Current query: {query}

Generate a conversational response that naturally incorporates the relevant information. Make sure that you tailor your response to what the user is asking. 
Your introduction to the user should be similar but not exactly 'how can I help you?'"""

class ExhibitEnhancementAgent:
    def __init__(self):
        self.llm = Gemini(model="models/gemini-1.5-flash", temperature=0.1)
        self.agent = self._create_agent()

    def _create_agent(self) -> ReActAgent:
        """Create ReAct agent with enhancement tools"""
        tools = [
            FunctionTool.from_defaults(
                fn=self.enhance_description,
                name="enhance_description",
                description="Enhances an exhibit description based on user interests and complexity"
            ),
            FunctionTool.from_defaults(
                fn=self.search,
                name="search",
                description="Searches for an exhibit by title and returns the details of the exhibit"
            )
        ]
        return ReActAgent.from_tools(tools, llm=self.llm, verbose=True)

    def enhance_description(self, description: str, interests: Dict[str, float], complexity: int) -> str:
        """Enhances an exhibit description based on user interests and desired complexity level"""
        prompt = self._build_enhancement_prompt(description, interests, complexity)
        try:
            response = self.llm.complete(prompt)
            enhanced = response.text.strip()
            if not enhanced or len(enhanced) < len(description)/2:
                raise ValueError("Enhancement produced invalid or too short response")
            return enhanced
        except Exception as e:
            print(f"Enhancement failed: {str(e)}")
            return description
    
    def search(self, exhibit_title: str):
        """This is a function that will search for an exhibit by title and return the details of the exhibit"""
        db = SessionLocal()
        try:
            exhibit = get_exhibit_by_title(db, exhibit_title)
            return str(exhibit.details) if exhibit else ""
        finally:
            db.close()

    def _build_enhancement_prompt(self, description: str, interests: Dict[str, float], complexity: int) -> str:
        return f"""You are an expert museum curator and science communicator.
Given the following exhibit description, enhance it by:
1. Expanding on topics that align with the user's interests: {json.dumps(interests, indent=2)}
2. Adjusting the complexity to match level {complexity}/100 where:
   - 0-30: Elementary school level
   - 31-60: High school level
   - 61-90: Undergraduate level
   - 91-100: Graduate/expert level
3. Adding engaging examples and analogies
4. Including real-world applications

Original description:
{description}

Provide an enhanced description, but should be short and to the point fun facts (no more than 2 sentences). 
Give a few fun facts that are tailored to the interests and complexity level specified."""

class FactCheckingAgent:
    def __init__(self):
        self.llm = Gemini(model="models/gemini-1.5-flash", temperature=0.1)
        self.agent = self._create_agent()

    def _create_agent(self) -> ReActAgent:
        """Create ReAct agent with fact checking tools"""
        tools = [
            FunctionTool.from_defaults(
                fn=self.verify_accuracy,
                name="verify_accuracy",
                description="Verifies if enhanced description is factually consistent with original"
            )
        ]
        return ReActAgent.from_tools(tools, llm=self.llm, verbose=True)

    def verify_accuracy(self, original: str, enhanced: str) -> Tuple[bool, str]:
        """Verifies that the enhanced description maintains factual accuracy"""
        prompt = self._build_verification_prompt(original, enhanced)
        try:
            response = self.llm.complete(prompt)
            # Parse response as JSON, with error handling
            try:
                result = json.loads(response.text)
                return result["is_accurate"], result["explanation"]
            except json.JSONDecodeError:
                # If JSON parsing fails, try to extract boolean from text
                is_accurate = "true" in response.text.lower()
                return is_accurate, response.text
        except Exception as e:
            print(f"Verification failed: {str(e)}")
            return False, str(e)

    def _build_verification_prompt(self, original: str, enhanced: str) -> str:
        return f"""You are a rigorous fact-checker specializing in scientific accuracy.
Compare the original and enhanced descriptions to ensure factual consistency.

Original description:
{original}

Enhanced description:
{enhanced}

Follow these steps:
1. Identify all factual claims in both descriptions
2. Compare corresponding claims between versions
3. Flag any inconsistencies or unsupported additions
4. Determine if the enhanced version maintains factual integrity

Respond with a JSON object in this exact format:
{{"is_accurate": true/false, "explanation": "your detailed explanation"}}"""

class TranslationAgent:
    def __init__(self):
        self.llm = Gemini(model="models/gemini-1.5-flash", temperature=0.1)
        self.agent = self._create_agent()

    def _create_agent(self) -> ReActAgent:
        """Create ReAct agent with translation tools"""
        tools = [
            FunctionTool.from_defaults(
                fn=self.translate,
                name="translate",
                description="Translates text to target language using Gemini"
            )
        ]
        return ReActAgent.from_tools(tools, llm=self.llm, verbose=True)

    def translate(self, text: str, target_language: str) -> str:
        """Translates text to target language using Gemini"""
        if target_language.lower() in ["english", "en"]:
            return text

        prompt = self._build_translation_prompt(text, target_language)
        try:
            response = self.llm.complete(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Translation failed: {str(e)}")
            return text

    def _build_translation_prompt(self, text: str, target_language: str) -> str:
        return f"""You are an expert translator with deep knowledge of scientific and technical terminology.
Translate the following text into {target_language}, ensuring that:
1. Technical terms are translated accurately using standard terminology in the target language
2. The complexity level and tone of the original text is preserved
3. Cultural context is appropriately adapted while maintaining scientific accuracy
4. Any idioms or analogies are translated to maintain their meaning and impact

Text to translate:
{text}

Provide only the translated text without any explanations or notes."""

class ExhibitContentManager:
    def __init__(self):
        self.enhancer = ExhibitEnhancementAgent()
        self.fact_checker = FactCheckingAgent()
        self.translator = TranslationAgent()

    def process_exhibit(
        self,
        description: str,
        interests: Dict[str, float],
        complexity: int,
        language: str
    ) -> Optional[str]:
        """Process exhibit description through enhancement, fact-checking, and translation"""
        print(f"Processing exhibit description with interests: {interests}, complexity: {complexity}, language: {language}")
        try:
            max_attempts = 3
            attempt = 0
            
            while attempt < max_attempts:
                # Enhance description using agent
                enhanced = self.enhancer.enhance_description(description, interests, complexity)

                # Verify accuracy using agent
                is_accurate, explanation = self.fact_checker.verify_accuracy(description, enhanced)

                if is_accurate:
                    # Only translate if language isn't English
                    if language.lower() not in ["english", "en"]:
                        final = self.translator.translate(enhanced, language)
                    else:
                        final = enhanced
                    return final

                print(f"Fact check failed (attempt {attempt + 1}): {explanation}")
                attempt += 1

            # If we've exhausted attempts, return original description
            return description

        except Exception as e:
            print(f"Exhibit processing failed: {str(e)}")
            return None
