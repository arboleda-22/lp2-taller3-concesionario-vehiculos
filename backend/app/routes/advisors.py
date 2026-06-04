from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Advisor
from app.schemas import AdvisorOut

router = APIRouter(tags=["advisors"])


@router.get("/advisors")
def get_advisors(db: Session = Depends(get_db)):
    advisors = db.query(Advisor).all()

    return {
        "success": True,
        "data": [AdvisorOut.model_validate(a).model_dump() for a in advisors]
    }