from typing import Dict, Optional, Tuple, List
from llama_index.llms.openai import OpenAI
from llama_index.llms.gemini import Gemini
from llama_index.core.agent import ReActAgent
from llama_index.core.tools import FunctionTool
import json
from functools import partial
import os

os.environ["GOOGLE_API_KEY"] = "AIzaSyC20Z_YtpL9VsJsLsLI2POBn_HZf9v5uOA"

class ConversationAgent:
    def __init__(self):
        self.llm = OpenAI(model="gpt-4-turbo-preview", temperature=0.7)
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

Generate a conversational response that naturally incorporates the relevant information."""

class ExhibitEnhancementAgent:
    def __init__(self):
        self.llm = OpenAI(model="gpt-4-turbo-preview", temperature=0.7)
        self.agent = self._create_agent()

    def _create_agent(self) -> ReActAgent:
        """Create ReAct agent with enhancement tools"""
        tools = [
            FunctionTool.from_defaults(
                fn=self.enhance_description,
                name="enhance_description",
                description="Enhances an exhibit description based on user interests and complexity"
            )
        ]
        return ReActAgent.from_tools(tools, llm=self.llm, verbose=True)

    def enhance_description(self, description: str, interests: Dict[str, float], complexity: int) -> str:
        """Enhances an exhibit description based on user interests and desired complexity level"""
        prompt = self._build_enhancement_prompt(description, interests, complexity)
        try:
            response = self.llm.complete(prompt)
            return response.text.strip()
        except Exception as e:
            print(f"Enhancement failed: {str(e)}")
            return description

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

Provide an enhanced description that maintains factual accuracy while being more engaging and tailored to the interests and complexity level specified."""

class FactCheckingAgent:
    def __init__(self):
        self.llm = OpenAI(model="gpt-4-turbo-preview", temperature=0.1)
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
            response = json.loads(self.llm.complete(prompt).text)
            return response["is_accurate"], response["explanation"]
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

Return a JSON object with:
- "is_accurate": boolean indicating if enhanced version is factually consistent
- "explanation": detailed explanation of your analysis
"""

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
        if target_language.lower() == "english":
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
        try:
            # Enhance description using agent
            enhanced = self.enhancer.agent.run(
                f"Enhance this description: {description}",
                function_args={"description": description, "interests": interests, "complexity": complexity}
            )

            # Verify accuracy using agent
            is_accurate, explanation = self.fact_checker.agent.run(
                f"Verify accuracy between original and enhanced descriptions",
                function_args={"original": description, "enhanced": enhanced}
            )

            if not is_accurate:
                print(f"Fact check failed: {explanation}")
                return None

            # Translate if needed using agent
            final = self.translator.agent.run(
                f"Translate text to {language}",
                function_args={"text": enhanced, "target_language": language}
            )

            return final

        except Exception as e:
            print(f"Exhibit processing failed: {str(e)}")
            return None
