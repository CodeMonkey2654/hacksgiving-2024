from datetime import datetime
from typing import Dict, List
import json

class ExhibitRecommender:
    def __init__(self, exhibits_file_path: str):
        """Initialize the recommender with exhibits data"""
        with open(exhibits_file_path, 'r') as f:
            self.exhibits = json.load(f)
        
        # Define experience level weights
        self.experience_levels = {
            'child': 1,
            'beginner': 2,
            'intermediate': 3,
            'expert': 4
        }
    
    def calculate_exhibit_score(self, 
                              exhibit: Dict, 
                              user_interests: Dict, 
                              user_experience: str,
                              visit_history: Dict[str, List[datetime]] = None) -> float:
        """Calculate a score for an exhibit based on user interests, experience, and visit history"""
        score = 0.0
        
        # Calculate base score from interests and experience
        for topic, interest_level in user_interests.items():
            if topic in exhibit['topics']:
                score += interest_level * exhibit['topics'][topic]
        
        # Apply experience level adjustment
        experience_diff = abs(
            self.experience_levels[user_experience] - 
            self.experience_levels[exhibit['recommended_level']]
        )
        experience_multiplier = 1 / (1 + experience_diff)
        score *= experience_multiplier
        
        # Adjust score based on visit history
        if visit_history and exhibit['id'] in visit_history:
            last_visit = max(visit_history[exhibit['id']])
            if datetime.now() - last_visit < self.RECENT_VISIT_THRESHOLD:
                score *= self.REPEAT_VISIT_PENALTY
        
        return score
    
    def get_recommendations(self, 
                          user_interests: Dict[str, int], 
                          user_experience: str,
                          visit_history: Dict[str, List[datetime]] = None,
                          num_recommendations: int = 5,
                          include_visited: bool = True) -> List[Dict]:
        """Get personalized exhibit recommendations"""
        exhibit_scores = []
        
        for exhibit in self.exhibits:
            # Skip already visited exhibits if include_visited is False
            if not include_visited and visit_history and exhibit['id'] in visit_history:
                continue
                
            score = self.calculate_exhibit_score(
                exhibit, 
                user_interests, 
                user_experience,
                visit_history
            )
            exhibit_scores.append((score, exhibit))
        
        # Sort by score and get top recommendations
        exhibit_scores.sort(reverse=True)
        top_exhibits = [exhibit for _, exhibit in exhibit_scores[:num_recommendations]]
        
        return top_exhibits