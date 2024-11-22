from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from recommender import ExhbitRecommender  # Add this import
from typing import Dict, List, Optional
from datetime import datetime
import uvicorn
import json
from user import User

app = FastAPI()

class UserData(BaseModel):
    physics_interest: int = 0
    chemistry_interest: int = 0
    astronomy_interest: int = 0
    biology_interest: int = 0
    language: str = 'English'
    reading_level: str = 'beginner'

class UserPreferences(BaseModel):
    interests: Dict[str, int]
    experience_level: str
    visit_history: Optional[Dict[str, List[datetime]]] = None
    include_visited: Optional[bool] = True

@app.get('/')
def root():
    return {'message': 'Hello, World!'}

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

@app.get('/get_exhibit_info')
def get_exhibit_info():
    with open('exhibit_info.json', 'r') as file:
        exhibit_info = json.load(file)
    return exhibit_info

@app.post("/get_recommendations")
async def get_recommendations(preferences: UserPreferences):
    recommender = ExhbitRecommender()
    try:
        recommendations = recommender.get_recommendations(
            preferences.interests,
            preferences.experience_level,
            preferences.visit_history,
            include_visited=preferences.include_visited
        )
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/record_visit/{user_id}/{exhibit_id}")
async def record_visit(user_id: str, exhibit_id: str):
    try:
        # Assuming you have a way to get user object
        user = get_user(user_id)  # You'll need to implement this
        user.record_visit(exhibit_id)
        return {"status": "success"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get('/api/topics')
async def get_topics():
    # Implement fetching topics from your database
    return TOPICS

@app.post('/api/topics')
async def create_topic(topic: dict):
    # Implement creating a new topic
    return topic

@app.put('/api/topics/{topic_id}')
async def update_topic(topic_id: str, topic: dict):
    # Implement updating an existing topic
    return topic

@app.delete('/api/topics/{topic_id}')
async def delete_topic(topic_id: str):
    # Implement deleting a topic
    return {"status": "success"}

# Similar endpoints for exhibits
@app.get('/api/exhibits')
async def get_exhibits():
    # Implement fetching exhibits from your database
    return exhibits

@app.post('/api/exhibits')
async def create_exhibit(exhibit: dict):
    # Implement creating a new exhibit
    return exhibit

@app.put('/api/exhibits/{exhibit_id}')
async def update_exhibit(exhibit_id: str, exhibit: dict):
    # Implement updating an existing exhibit
    return exhibit

@app.delete('/api/exhibits/{exhibit_id}')
async def delete_exhibit(exhibit_id: str):
    # Implement deleting an exhibit
    return {"status": "success"}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)