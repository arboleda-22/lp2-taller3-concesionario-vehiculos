from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text
from datetime import datetime
from app.database import Base


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(String, primary_key=True, index=True)  # Ej: car-1
    brand = Column(String, nullable=False)
    model = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    mileage = Column(Integer, nullable=False, default=0)
    fuel = Column(String, nullable=False)
    transmission = Column(String, nullable=False)
    city = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    category = Column(String, nullable=False)
    image = Column(String, nullable=False)
    featured = Column(Boolean, default=False)
    rating = Column(Float, default=4.5)
    monthly_from = Column(Float, nullable=False)
    color = Column(String, nullable=False)
    stock = Column(Integer, default=1)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, nullable=False, index=True)
    vehicle_id = Column(String, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class Quote(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, nullable=True)
    vehicle_id = Column(String, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    vehicle_value = Column(Float, nullable=True)
    initial_fee = Column(Float, nullable=True)
    months = Column(Integer, nullable=True)
    rate = Column(Float, nullable=True)
    monthly_payment = Column(Float, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(String, nullable=True)
    vehicle_id = Column(String, nullable=False)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    date = Column(String, nullable=False)
    message = Column(Text, nullable=True)
    status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)


class Advisor(Base):
    __tablename__ = "advisors"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    response = Column(String, nullable=False)
    city = Column(String, nullable=False)
    