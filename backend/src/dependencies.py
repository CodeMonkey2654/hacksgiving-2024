<<<<<<< HEAD:backend/src/dependencies.py
from typing import Generator
from database.database import SessionLocal

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
=======
from typing import Generator
from database import SessionLocal

def get_db() -> Generator:
    db = SessionLocal()
    try:
        yield db
    finally:
>>>>>>> ecb15eb (ui amazing):backend/dependencies.py
        db.close() 