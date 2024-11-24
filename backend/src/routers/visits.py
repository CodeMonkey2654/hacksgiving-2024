from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import database.crud as crud
from database.schemas import Visit, VisitCreate
from dependencies import get_db
from datetime import datetime

router = APIRouter(
    prefix="/visits",
    tags=["visits"]
)

@router.post("")
def record_visit(
    visit: VisitCreate,
    db: Session = Depends(get_db)
):
    return crud.create_visit(db, visit)

@router.get("/users/{user_id}")
def get_user_visits(
    user_id: str,
    db: Session = Depends(get_db)
):
    return crud.get_user_visits(db, user_id)

