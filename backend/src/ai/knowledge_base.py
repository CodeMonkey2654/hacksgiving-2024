from typing import List, Tuple, Dict
from database.models import Exhibit
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.vector_stores.faiss import FaissVectorStore
from llama_index.core import VectorStoreIndex, Document, Settings
import faiss

class ExhibitKnowledgeBase:
    def __init__(self):
        """Initialize the knowledge base with LlamaIndex and FAISS"""
        # Configure global settings
        Settings.embed_model = OpenAIEmbedding()
        
        # Initialize FAISS index with L2 distance
        faiss_index = faiss.IndexFlatL2(1536) # 1536 is OpenAI embedding dimension
        self.vector_store = FaissVectorStore(faiss_index=faiss_index)
        
        self.exhibit_map: Dict[str, Exhibit] = {}
        self.index = None
        
    def add_exhibits(self, exhibits: List[Exhibit]) -> None:
        """Add exhibits to the knowledge base
        
        Args:
            exhibits: List of Exhibit objects to add
        """
        documents = []
        for exhibit in exhibits:
            text = f"{exhibit.title}. {exhibit.description}"
            doc = Document(text=text, id_=exhibit.id)
            documents.append(doc)
            self.exhibit_map[exhibit.id] = exhibit
            
        # Create or update index
        if self.index is None:
            self.index = VectorStoreIndex.from_documents(
                documents,
                vector_store=self.vector_store
            )
        else:
            self.index.insert_nodes(documents)
            
    def find_similar_exhibits(self, query: str, k: int = 5) -> List[Tuple[str, float]]:
        """Find k most similar exhibits to text query
        
        Args:
            query: Text query to find similar exhibits for
            k: Number of similar exhibits to return
            
        Returns:
            List of tuples containing (exhibit_id, similarity_score)
        """
        if self.index is None:
            return []
            
        # Query the index
        retriever = self.index.as_retriever(similarity_top_k=k)
        nodes = retriever.retrieve(query)
        
        # Convert to list of (exhibit_id, score) tuples
        results = []
        for node in nodes:
            exhibit_id = node.node.id_
            score = node.score if hasattr(node, 'score') else 0.0
            results.append((exhibit_id, float(score)))
            
        return results
        
    def __len__(self) -> int:
        """Return number of exhibits in knowledge base"""
        return len(self.exhibit_map)
