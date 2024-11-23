from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import database.crud as crud
from database.schemas import Exhibit, ExhibitCreate
from dependencies import get_db
from ai.agents import ExhibitContentManager
router = APIRouter(
    prefix="/exhibits",
    tags=["exhibits"]
)

@router.get("", response_model=List[Exhibit])
def get_exhibits(db: Session = Depends(get_db)):
    return crud.get_exhibits(db)

@router.get("/{exhibit_id}", response_model=Exhibit)
def get_exhibit(exhibit_id: str, db: Session = Depends(get_db)):
    exhibit = crud.get_exhibit(db, exhibit_id)
    if exhibit is None:
        raise HTTPException(status_code=404, detail="Exhibit not found")
    return exhibit

@router.post("", response_model=Exhibit)
def create_exhibit(exhibit: ExhibitCreate, db: Session = Depends(get_db)):
    return crud.create_exhibit(db, exhibit)

@router.put("/{exhibit_id}", response_model=Exhibit)
def update_exhibit(exhibit_id: str, exhibit: ExhibitCreate, db: Session = Depends(get_db)):
    return crud.update_exhibit(db, exhibit_id, exhibit)

@router.delete("/{exhibit_id}")
def delete_exhibit(exhibit_id: str, db: Session = Depends(get_db)):
    crud.delete_exhibit(db, exhibit_id)
    return {"status": "success"}

@router.get("/{exhibit_id}/description")
def get_exhibit_description(
    exhibit_id: str,
    complexity: int = 50,
    interests: dict = None,
    language: str = "english",
    db: Session = Depends(get_db)
):
    exhibit = crud.get_exhibit(db, exhibit_id)
    if exhibit is None:
        raise HTTPException(status_code=404, detail="Exhibit not found")

    content_manager = ExhibitContentManager()
    enhanced_description = content_manager.process_exhibit(
        description=exhibit.description,
        interests=interests,
        complexity=complexity,
        language=language
    )

    if enhanced_description is None:
        return {
            "description": exhibit.description
        }

    return {
        "description": enhanced_description
    }
