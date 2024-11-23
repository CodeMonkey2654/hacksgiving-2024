from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import database.crud as crud
from database.schemas import Visit, VisitCreate
from dependencies import get_db

router = APIRouter(
    prefix="/visits",
    tags=["visits"]
)

@router.post("", response_model=Visit)
def record_visit(visit: VisitCreate, db: Session = Depends(get_db)):
    return crud.create_visit(db, visit)

@router.get("/users/{user_id}", response_model=List[Visit])
def get_user_visits(user_id: str, db: Session = Depends(get_db)):
    return crud.get_user_visits(db, user_id)

@router.get("/exhibits/{exhibit_id}", response_model=List[Visit])
def get_exhibit_visits(exhibit_id: str, db: Session = Depends(get_db)):
    return crud.get_exhibit_visits(db, exhibit_id)