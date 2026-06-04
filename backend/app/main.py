from fastapi import FastAPI
from app.database import Base, engine, SessionLocal
from app.seed import seed_data
from app.routes.vehicles import router as vehicles_router
from app.routes.favorites import router as favorites_router
from app.routes.quotes import router as quotes_router
from app.routes.appointments import router as appointments_router
from app.routes.advisors import router as advisors_router

app = FastAPI(
    title="Concesionario API",
    version="1.0.0",
    description="API REST para concesionario / venta de carros"
)

Base.metadata.create_all(bind=engine)

# Sembrar datos mock iniciales
db = SessionLocal()
seed_data(db)
db.close()

app.include_router(vehicles_router, prefix="/api")
app.include_router(favorites_router, prefix="/api")
app.include_router(quotes_router, prefix="/api")
app.include_router(appointments_router, prefix="/api")
app.include_router(advisors_router, prefix="/api")


@app.get("/")
def root():
    return {
        "success": True,
        "data": {
            "message": "API del concesionario funcionando"
        }
    }


@app.get("/health")
def health():
    return {
        "success": True,
        "data": {
            "status": "ok"
        }
    }
