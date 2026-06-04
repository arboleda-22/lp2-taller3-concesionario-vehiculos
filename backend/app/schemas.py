from datetime import datetime
from pydantic import BaseModel, ConfigDict


class VehicleOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    brand: str
    model: str
    year: int
    price: float
    mileage: int
    fuel: str
    transmission: str
    city: str
    condition: str
    category: str
    image: str
    featured: bool
    rating: float
    monthly_from: float
    color: str
    stock: int
    description: str | None = None
    created_at: datetime | None = None


class FavoriteToggleRequest(BaseModel):
    vehicleId: str
    isFavorite: bool


class FavoriteIdsResponse(BaseModel):
    success: bool
    data: list[str]
    error: str | None = None


class CustomerInfo(BaseModel):
    name: str
    email: str
    phone: str


class SimulationInfo(BaseModel):
    vehicleValue: float | None = None
    initialFee: float | None = None
    months: int | None = None
    rate: float | None = None
    financing: dict | None = None


class QuoteCreate(BaseModel):
    vehicleId: str
    customer: CustomerInfo
    simulation: SimulationInfo | None = None
    userId: str | None = None


class QuoteOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str | None = None
    vehicle_id: str
    name: str
    email: str
    phone: str
    vehicle_value: float | None = None
    initial_fee: float | None = None
    months: int | None = None
    rate: float | None = None
    monthly_payment: float | None = None
    status: str
    created_at: datetime


class AppointmentCreate(BaseModel):
    vehicleId: str
    name: str
    phone: str
    date: str
    message: str | None = None
    userId: str | None = None


class AppointmentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: str | None = None
    vehicle_id: str
    name: str
    phone: str
    date: str
    message: str | None = None
    status: str
    created_at: datetime


class AdvisorOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    name: str
    role: str
    response: str
    city: str
