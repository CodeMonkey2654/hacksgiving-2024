from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from user import User

app = FastAPI()

class UserData(BaseModel):
    physics_interest: int = 0
    chemistry_interest: int = 0
    astronomy_interest: int = 0
    biology_interest: int = 0
    language: str = 'English'
    reading_level: str = 'beginner'

@app.post('/create_user')
def create_user(data: UserData):
    """
    API endpoint to create a User instance from the provided data.
    Expects a JSON payload with interest levels, language, and reading level.
    """
    # Create a User instance
    user = User(data.physics_interest, data.chemistry_interest, data.astronomy_interest, data.biology_interest, data.language, data.reading_level)

    # Return a success response with user details
    return {
        'message': 'User created successfully!',
        'user': {
            'interests': user.get_interests(),
            'language': user.get_language(),
            'reading_level': user.get_reading_level()
        }
    }

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)