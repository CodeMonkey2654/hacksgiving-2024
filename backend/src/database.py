from enum import Enum
import sqlite3
from typing import List, Optional

class Topic(Enum):
    ART = "art"
    HISTORY = "history" 
    SCIENCE = "science"
    TECHNOLOGY = "technology"

class Exhibit:
    def __init__(
        self,
        exhibit_id: str,
        title: str,
        description: str,
        image_url: str,
        topic: Topic
    ):
        self.exhibit_id = exhibit_id
        self.title = title
        self.description = description
        self.image_url = image_url
        self.topic = topic

class Database:
    def __init__(self, db_path: str = "museum.db"):
        self.db_path = db_path
        self._init_db()

    def _init_db(self):
        """Initialize the database with the exhibits table"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS exhibits (
                    exhibit_id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    description TEXT,
                    image_url TEXT,
                    topic TEXT NOT NULL
                )
            """)
            conn.commit()

    def add_exhibit(self, exhibit: Exhibit) -> None:
        """Add or update an exhibit in the database"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                INSERT OR REPLACE INTO exhibits 
                (exhibit_id, title, description, image_url, topic)
                VALUES (?, ?, ?, ?, ?)
            """, (
                exhibit.exhibit_id,
                exhibit.title,
                exhibit.description,
                exhibit.image_url,
                exhibit.topic.value
            ))
            conn.commit()

    def get_exhibit(self, exhibit_id: str) -> Optional[Exhibit]:
        """Retrieve an exhibit by ID"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute(
                "SELECT * FROM exhibits WHERE exhibit_id = ?", 
                (exhibit_id,)
            )
            row = cursor.fetchone()
            
            if row:
                return Exhibit(
                    exhibit_id=row[0],
                    title=row[1],
                    description=row[2],
                    image_url=row[3],
                    topic=Topic(row[4])
                )
            return None

    def get_all_exhibits(self) -> List[Exhibit]:
        """Retrieve all exhibits"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.execute("SELECT * FROM exhibits")
            return [
                Exhibit(
                    exhibit_id=row[0],
                    title=row[1],
                    description=row[2],
                    image_url=row[3],
                    topic=Topic(row[4])
                )
                for row in cursor.fetchall()
            ]

    def delete_exhibit(self, exhibit_id: str) -> None:
        """Delete an exhibit by ID"""
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("DELETE FROM exhibits WHERE exhibit_id = ?", (exhibit_id,))
            conn.commit()