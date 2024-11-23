import axios from 'axios';

const subscriptionKey = 'BQInJpXsLuzTkzbNiXXZ9gKcHcuWLWUx3C8DdwGdMImckqOB6lXzJQQJ99AKAC1i4TkXJ3w3AAAbACOGz9As'; // Replace with your Azure Translator Subscription Key
const endpoint = 'https://api.cognitive.microsofttranslator.com/translate'; // Replace with your Endpoint URL

export const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${endpoint}?api-version=3.0&to=${targetLang}`,
      [{ Text: text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': subscriptionKey,
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Region': 'centralus' 
        },
      }
    );

    // Return the translated text
    return response.data[0].translations[0].text;
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Error translating text');
  }
};
