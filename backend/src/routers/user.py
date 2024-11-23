from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import database.crud as crud
from database.schemas import User, UserCreate
from dependencies import get_db

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("", response_model=List[User])
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@router.post("", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@router.get("/{user_id}", response_model=User)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user