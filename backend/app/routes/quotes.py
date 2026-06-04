from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Quote, Vehicle
from app.schemas import QuoteCreate, QuoteOut

router = APIRouter(tags=["quotes"])


@router.post("/quotes", status_code=status.HTTP_201_CREATED)
def create_quote(payload: QuoteCreate, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == payload.vehicleId).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")

    simulation = payload.simulation
    monthly_payment = None

    if simulation and simulation.financing:
        monthly_payment = simulation.financing.get("installment")

    quote = Quote(
        user_id=payload.userId,
        vehicle_id=payload.vehicleId,
        name=payload.customer.name,
        email=payload.customer.email,
        phone=payload.customer.phone,
        vehicle_value=simulation.vehicleValue if simulation else None,
        initial_fee=simulation.initialFee if simulation else None,
        months=simulation.months if simulation else None,
        rate=simulation.rate if simulation else None,
        monthly_payment=monthly_payment,
        status="pending"
    )

    db.add(quote)
    db.commit()
    db.refresh(quote)

    return {
        "success": True,
        "data": QuoteOut.model_validate(quote).model_dump()
    }