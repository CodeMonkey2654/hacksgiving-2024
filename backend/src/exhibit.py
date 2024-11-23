from typing import Dict, Optional
from enum import Enum
from database import Database

class Topic(Enum):
    PHYSICS = "physics"
    CHEMISTRY = "chemistry"
    ASTRONOMY = "astronomy"
    BIOLOGY = "biology"

class Exhibit:
    _instances: Dict[str, 'Exhibit'] = {}
    
    def __init__(self, exhibit_id: str, title: str, description: str, image_url: str, topic: Topic):
        """
        Initialize an exhibit instance.
        
        :param exhibit_id: Unique identifier for the exhibit
        :param title: Title of the exhibit
        :param description: Description of the exhibit
        :param image_url: URL to the exhibit's image
        :param topic: Topic category of the exhibit
        """
        self.exhibit_id = exhibit_id
        self.title = title
        self.description = description
        self.image_url = image_url
        self.topic = topic

    @classmethod
    def get_exhibit(cls, exhibit_id: str, title: str = "", description: str = "", 
                   image_url: str = "", topic: Optional[Topic] = None) -> 'Exhibit':
        """
        Get or create an exhibit instance. If the exhibit exists, return it;
        if not, create a new one.
        """
        if exhibit_id not in cls._instances:
            cls._instances[exhibit_id] = cls(exhibit_id, title, description, image_url, topic)
        return cls._instances[exhibit_id]

    @classmethod
    def get_all_exhibits(cls) -> Dict[str, 'Exhibit']:
        """
        Get all existing exhibits.
        """
        return cls._instances

    def __str__(self):
        return f"Exhibit(id={self.exhibit_id}, title={self.title}, topic={self.topic.value})"

# ... existing code ...

def initialize_exhibits(db: Database):
    """
    Initialize example exhibits in the database
    """
    exhibits = [
        Exhibit(
            "PHY001",
            "Newton's Laws of Motion",
            "Interactive demonstration of Newton's three laws of motion",
            "/images/newton_laws.jpg",
            Topic.PHYSICS
        ),
        Exhibit(
            "CHEM001",
            "Periodic Table Interactive",
            "Explore the periodic table of elements",
            "/images/periodic_table.jpg",
            Topic.CHEMISTRY
        ),
        Exhibit(
            "AST001",
            "Solar System Model",
            "Scale model of our solar system",
            "/images/solar_system.jpg",
            Topic.ASTRONOMY
        )
    ]
    
    for exhibit in exhibits:
        db.add_exhibit(exhibit)

        