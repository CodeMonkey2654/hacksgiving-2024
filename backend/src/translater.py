from openai import OpenAI
import google.generativeai as genai
import json

class Translater:
    def __init__(self, secrets_path: str, model: str="gemini-1.5-flash", method: str="OpenAI"):
        """Initialize the translater with a certain model, path to secrets.json
        file with the Google API key, and method of getting responses.
        
        Takes:
            secrets_path: str - path to a json file which has the google api key under "google_api_key"
            model: str - model name (recommend either gemini-1.5-flash or gemini-1.5-8b)
                        Defaults to gemini-1.5-flash
            method: str - method of getting response using openai api or google api
                        Defaults to OpenAI 
                        Choices are OpenAI or GoogleGenAI
            
        """
        with open(secrets_path, 'r') as f:
            self.api_key = json.load(f)['google_api_key']
        
        self.model = model
        self.method = method
        
        genai.configure(api_key=self.api_key)
            
        if self.method == 'OpenAI':
            self.client = genai.GenerativeModel(self.model) 
        elif self.method == 'GoogleGenAI':
            self.client = OpenAI(
                api_key=self.api_key,
                base_url="https://generativelanguage.googleapis.com/v1beta/"
            )
        else:
            raise NotImplementedError("Only OpenAI and GoogleGenAI APIs are supported.")
    
    def __call__(self, text_to_translate: str, language: str):
        """Overloading call operator for ease of use to translate passed in text to provided language.
        
        Takes:
            text_to_translate: str - the text to translate to language
            language: str - language to translate text to
            
        Returns:
            Output from the model
        """
        
        if self.method == 'OpenAI':
            response = self.client.generate_content(f"Translate the following text to {language} and output only the translated, formal version: '{text_to_translate}'")
        elif self.method == 'GoogleGenAI':
            response = self.client.chat.completions.create(
                model=self.model,
                n=1,
                messages=[
                    {"role": "system", 
                    "content": f"You are a helpful accessibility assistant that translates given text and ONLY the given text into {language}. Your output should be the translated text ONLY and use the formal version."},
                    {
                        "role": "user",
                        "content": f"{text_to_translate}"
                    }
                ]
            )
        return response