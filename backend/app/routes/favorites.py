from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Favorite, Vehicle
from app.schemas import FavoriteToggleRequest

router = APIRouter(tags=["favorites"])


@router.get("/users/{user_id}/favorites")
def get_favorites(user_id: str, db: Session = Depends(get_db)):
    favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    favorite_ids = [f.vehicle_id for f in favorites]

    return {
        "success": True,
        "data": favorite_ids
    }


@router.post("/users/{user_id}/favorites")
def toggle_favorite(user_id: str, payload: FavoriteToggleRequest, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == payload.vehicleId).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehículo no encontrado")

    existing = db.query(Favorite).filter(
        Favorite.user_id == user_id,
        Favorite.vehicle_id == payload.vehicleId
    ).first()

    if payload.isFavorite:
        if not existing:
            favorite = Favorite(user_id=user_id, vehicle_id=payload.vehicleId)
            db.add(favorite)
            db.commit()
    else:
        if existing:
            db.delete(existing)
            db.commit()

    favorites = db.query(Favorite).filter(Favorite.user_id == user_id).all()
    favorite_ids = [f.vehicle_id for f in favorites]

    return {
        "success": True,
        "data": favorite_ids
    }
