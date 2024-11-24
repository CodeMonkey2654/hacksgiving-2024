from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Dict
import json
import numpy as np
from database.schemas import Exhibit, Topic
from database.crud import get_user, get_user_visits, get_exhibits, get_topics, get_exhibit_topics
from dependencies import get_db
from database.database import SessionLocal

router = APIRouter(
    prefix="/recommendations",
    tags=["recommendations"]
)

def get_all_topics_related_to_an_exhibit(exhibit_id: str, exhibit_topics_data: List[Dict], topics_data: List[Dict]) -> List[Dict]:
    """Get all topics related to an exhibit with their metadata"""
    ret = []
    for exhibit_topic in exhibit_topics_data:
        if exhibit_topic.exhibit_id == exhibit_id:
            ret.append(exhibit_topic)

    # Link all topics to the topic_ids
    for i, topic in enumerate(ret):
        for topic_data in topics_data:
            if topic_data.id == topic.topic_id:
                ret[i].topic_data = topic_data
                break

    return ret

class AbstractRetriever:
    def __init__(self, exhibits):
        self.exhibits = exhibits

    def retrieve(self, user, visit_history):
        raise NotImplementedError

class PopularityRetriever(AbstractRetriever):
    def __init__(self, exhibits):
        super().__init__(exhibits)
        # Get popularity from exhibit data
        self.popularities = {}
        for exhibit in self.exhibits:
            try:
                self.popularities[exhibit.id] = float(json.loads(exhibit.details)["popularity"]) / 5
                if self.popularities[exhibit.id] is None:
                    self.popularities[exhibit.id] = 0
            except:
                self.popularities[exhibit.id] = 0

    def retrieve(self, user, visit_history):
        # Sort exhibits by popularity
        sorted_exhibits = sorted(self.exhibits, key=lambda x: -self.popularities[x.id])
        
        return [
            {
                "exhibit_id": exhibit.id,
                "score": self.popularities[exhibit.id]
            }
            for exhibit in sorted_exhibits
        ]

class VisitRetriever(AbstractRetriever):
    def retrieve(self, user, visit_history):
        visited_exhibit_ids = set(map(lambda x: x["exhibit_id"], visit_history))
        
        return [
            {
                "exhibit_id": exhibit.id,
                "score": -1 if exhibit.id in visited_exhibit_ids else 1
            }
            for exhibit in self.exhibits
        ]

class InterestBasedRetriever(AbstractRetriever):
    def __init__(self, exhibits, db: Session):
        super().__init__(exhibits)
        
        # Get topics from database
        self.topics_data = get_topics(db)
        
        self.exhibit_topics_data = get_exhibit_topics(db)

        self.exhibit_vectors = {}  # exhibit_id -> vector

        # Create vector for every exhibit
        for exhibit in self.exhibits:
            vector = np.zeros(len(self.topics_data))
            exhibit_topics = get_all_topics_related_to_an_exhibit(
                exhibit.id, 
                self.exhibit_topics_data,
                self.topics_data
            )

            # Set relevance for every topic index
            for exhibit_topic in exhibit_topics:
                topic_index = int(exhibit_topic.topic_data.id.split("_")[1])
                vector[topic_index] = exhibit_topic.relevance

            self.exhibit_vectors[exhibit.id] = vector

    def retrieve(self, user, visit_history):
        # Get vector from user
        user_vector = np.zeros(len(self.topics_data))
        user_interests = user["interests"]
        
        for topic_id, relevance in user_interests.items():
            topic_index = int(topic_id.split("_")[1])
            user_vector[topic_index] = relevance

        # Normalize
        if np.linalg.norm(user_vector) > 0:
            user_vector = user_vector / np.linalg.norm(user_vector)

        # Compare user vector to exhibit vectors
        similarities = {}
        for exhibit_id, exhibit_vector in self.exhibit_vectors.items():
            if np.linalg.norm(exhibit_vector) > 0:
                exhibit_vector = exhibit_vector / np.linalg.norm(exhibit_vector)
            similarities[exhibit_id] = np.dot(user_vector, exhibit_vector)

        return [
            {
                "exhibit_id": exhibit.id,
                "score": similarities[exhibit.id]
            }
            for exhibit in self.exhibits
        ]

class AggregateRetriever:
    def __init__(self, exhibits_data, db: Session):
        self.popularity_retriever = PopularityRetriever(exhibits_data)
        self.visit_retriever = VisitRetriever(exhibits_data)
        self.interest_retriever = InterestBasedRetriever(exhibits_data, db)
        
        self.retrievers = [
            {"retriever": self.popularity_retriever, "weight": 1},
            {"retriever": self.visit_retriever, "weight": 1},
            {"retriever": self.interest_retriever, "weight": 1}
        ]

    def retrieve(self, user, visit_history):
        # Get all recommendations
        recommendations = []
        for retriever in self.retrievers:
            recommendations.append(retriever["retriever"].retrieve(user, visit_history))

        # Aggregate scores
        aggregate = {}
        for recommendation in recommendations:
            for rec in recommendation:
                if rec["exhibit_id"] not in aggregate:
                    aggregate[rec["exhibit_id"]] = 0
                aggregate[rec["exhibit_id"]] += rec["score"]

        # Convert to list and sort
        ret = []
        for exhibit_id, score in aggregate.items():
            ret.append({
                "exhibit_id": exhibit_id,
                "score": score
            })
        return sorted(ret, key=lambda x: -x["score"])

@router.get("/user/{user_id}", response_model=List[Exhibit])
def get_recommendations(
    user_id: str,
    k: int = 5,
    db: Session = Depends(get_db)
):
    # Get user and their interests
    user = get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get visit history
    visit_history = get_user_visits(db, user_id)
    
    # Load exhibits data
    exhibits_data = get_exhibits(db)
        
    # Initialize retriever
    retriever = AggregateRetriever(exhibits_data, db)
    
    # Get recommendations
    recommendations = retriever.retrieve(
        user={"id": user_id, "interests": user.interests},
        visit_history=visit_history
    )
    
    print(recommendations)
    # Convert to Exhibit objects and return top k
    exhibits = []
    for rec in recommendations[:k]:
        exhibit_data = next(e for e in exhibits_data if e.id == rec["exhibit_id"])
        exhibits.append(exhibit_data)
        
    return exhibits
