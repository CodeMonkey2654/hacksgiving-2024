from typing import Dict, List, Optional
from .knowledge_base import ExhibitKnowledgeBase
from database.models import Exhibit

class ExhibitRecommender:
    def __init__(self, knowledge_base: ExhibitKnowledgeBase):
        """Initialize recommender with knowledge base
        
        Args:
            knowledge_base: ExhibitKnowledgeBase instance to use for recommendations
        """
        self.knowledge_base = knowledge_base

    def get_next_exhibits(self, interests: Dict[str, float], 
                         visited_exhibits: List[str] = None,
                         k: int = 3) -> List[Exhibit]:
        """Get recommended next exhibits based on interests
        
        Args:
            interests: Dict mapping interest areas to scores (0-1)
            visited_exhibits: Optional list of already visited exhibit IDs to exclude
            k: Number of recommendations to return
            
        Returns:
            List of recommended Exhibit objects
        """
        if len(self.knowledge_base) == 0:
            return []
            
        # Construct query from interests
        query_parts = []
        for topic, score in interests.items():
            if score > 0.3:  # Only include significant interests
                query_parts.append(f"{topic} ({int(score * 100)}% interest)")
        
        query = "Find exhibits related to: " + ", ".join(query_parts)
        
        # Get similar exhibits
        similar_exhibits = self.knowledge_base.find_similar_exhibits(query, k=k+5)
        
        # Filter out visited exhibits and get full objects
        visited_exhibits = visited_exhibits or []
        recommendations = []
        
        for exhibit_id, score in similar_exhibits:
            if len(recommendations) >= k:
                break
                
            if exhibit_id not in visited_exhibits:
                exhibit = self.knowledge_base.exhibit_map.get(exhibit_id)
                if exhibit:
                    recommendations.append(exhibit)
                    
        return recommendations
