import faiss
import numpy as np
from typing import List, Tuple, Dict
from database.models import Exhibit

class ExhibitKnowledgeBase:
    def __init__(self, dimension: int = 128):
        """Initialize the knowledge base with FAISS index
        
        Args:
            dimension: Dimension of the exhibit embedding vectors
        """
        self.dimension = dimension
        self.index = faiss.IndexFlatL2(dimension)  # Using L2 distance for similarity
        self.exhibit_map: Dict[int, str] = {}  # Maps FAISS index positions to exhibit IDs
        
    def add_exhibits(self, exhibits: List[Exhibit], embeddings: np.ndarray) -> None:
        """Add exhibits and their embeddings to the knowledge base
        
        Args:
            exhibits: List of Exhibit objects to add
            embeddings: numpy array of embeddings with shape (n_exhibits, dimension)
        """
        if len(exhibits) != embeddings.shape[0]:
            raise ValueError("Number of exhibits must match number of embeddings")
            
        if embeddings.shape[1] != self.dimension:
            raise ValueError(f"Embeddings must have dimension {self.dimension}")
            
        # Convert embeddings to float32 as required by FAISS
        embeddings = embeddings.astype(np.float32)
        
        # Store mapping of FAISS indices to exhibit IDs
        start_idx = self.index.ntotal
        for i, exhibit in enumerate(exhibits):
            self.exhibit_map[start_idx + i] = exhibit.id
            
        # Add embeddings to FAISS index    
        self.index.add(embeddings)
        
    def find_similar_exhibits(self, query_embedding: np.ndarray, k: int = 5) -> List[Tuple[str, float]]:
        """Find k most similar exhibits to query embedding
        
        Args:
            query_embedding: Query vector of dimension D
            k: Number of similar exhibits to return
            
        Returns:
            List of tuples containing (exhibit_id, distance)
        """
        # Ensure query has correct shape and type
        query_embedding = query_embedding.astype(np.float32).reshape(1, -1)
        
        if query_embedding.shape[1] != self.dimension:
            raise ValueError(f"Query embedding must have dimension {self.dimension}")
            
        # Search index
        distances, indices = self.index.search(query_embedding, k)
        
        # Convert to list of (exhibit_id, distance) tuples
        results = []
        for distance, idx in zip(distances[0], indices[0]):
            if idx in self.exhibit_map:  # Check if index exists
                results.append((self.exhibit_map[idx], float(distance)))
                
        return results
        
    def __len__(self) -> int:
        """Return number of exhibits in knowledge base"""
        return self.index.ntotal
