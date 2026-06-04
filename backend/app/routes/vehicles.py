from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Vehicle
from app.schemas import VehicleOut

router = APIRouter(tags=["vehicles"])


@router.get("/vehicles")
def get_vehicles(
    category: str | None = Query(default=None),
    condition: str | None = Query(default=None),
    city: str | None = Query(default=None),
    max_price: float | None = Query(default=None),
    search: str | None = Query(default=None),
    db: Session = Depends(get_db)
):
    query = db.query(Vehicle)

    if category:
        query = query.filter(Vehicle.category == category)

    if condition:
        query = query.filter(Vehicle.condition == condition)

    if city:
        query = query.filter(Vehicle.city == city)

    if max_price is not None:
        query = query.filter(Vehicle.price <= max_price)

    vehicles = query.all()

    if search:
        search_lower = search.lower()
        vehicles = [
            v for v in vehicles
            if search_lower in f"{v.brand} {v.model} {v.city} {v.category}".lower()
        ]

    return {
        "success": True,
        "data": [VehicleOut.model_validate(v).model_dump() for v in vehicles]
    }


@router.get("/vehicles/{vehicle_id}")
def get_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")

    return {
        "success": True,
        "data": VehicleOut.model_validate(vehicle).model_dump()
    }
