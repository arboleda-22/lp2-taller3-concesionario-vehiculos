from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Appointment, Vehicle
from app.schemas import AppointmentCreate, AppointmentOut

router = APIRouter(tags=["appointments"])


@router.post("/appointments", status_code=status.HTTP_201_CREATED)
def create_appointment(payload: AppointmentCreate, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == payload.vehicleId).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")

    appointment = Appointment(
        user_id=payload.userId,
        vehicle_id=payload.vehicleId,
        name=payload.name,
        phone=payload.phone,
        date=payload.date,
        message=payload.message,
        status="pending"
    )

    db.add(appointment)
    db.commit()
    db.refresh(appointment)

    return {
        "success": True,
        "data": AppointmentOut.model_validate(appointment).model_dump()
    }
