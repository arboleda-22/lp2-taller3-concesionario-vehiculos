from sqlalchemy.orm import Session
from app.models import Vehicle, Advisor


def seed_data(db: Session):
    vehicle_exists = db.query(Vehicle).first()
    advisor_exists = db.query(Advisor).first()

    if not vehicle_exists:
        vehicles = [
            Vehicle(
                id="car-1",
                brand="Mazda",
                model="CX-30 Grand Touring",
                year=2025,
                price=129900000,
                mileage=1200,
                fuel="Gasolina",
                transmission="Automática",
                city="Cali",
                condition="Nuevo",
                category="SUV",
                image="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
                featured=True,
                rating=4.9,
                monthly_from=1980000,
                color="Rojo",
                stock=4,
                description="SUV moderna con excelente equipamiento y seguridad."
            ),
            Vehicle(
                id="car-2",
                brand="Toyota",
                model="Corolla Cross XEI",
                year=2024,
                price=118500000,
                mileage=4200,
                fuel="Híbrido",
                transmission="Automática",
                city="Cali",
                condition="Seminuevo",
                category="SUV",
                image="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
                featured=True,
                rating=4.8,
                monthly_from=1840000,
                color="Blanco perla",
                stock=2,
                description="Excelente eficiencia y comodidad para ciudad y carretera."
            ),
            Vehicle(
                id="car-3",
                brand="Chevrolet",
                model="Onix Premier Turbo",
                year=2025,
                price=81900000,
                mileage=0,
                fuel="Gasolina",
                transmission="Automática",
                city="Palmira",
                condition="Nuevo",
                category="Sedán",
                image="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
                featured=False,
                rating=4.6,
                monthly_from=1230000,
                color="Gris titanio",
                stock=6,
                description="Sedán eficiente, ideal para uso diario."
            ),
            Vehicle(
                id="car-4",
                brand="Renault",
                model="Duster Intens CVT",
                year=2023,
                price=89900000,
                mileage=13800,
                fuel="Gasolina",
                transmission="CVT",
                city="Cali",
                condition="Usado certificado",
                category="SUV",
                image="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop",
                featured=False,
                rating=4.5,
                monthly_from=1410000,
                color="Negro ónix",
                stock=1,
                description="SUV robusta con amplio espacio interior."
            ),
            Vehicle(
                id="car-5",
                brand="Kia",
                model="Sportage Desire",
                year=2025,
                price=152000000,
                mileage=600,
                fuel="Gasolina",
                transmission="Automática",
                city="Cali",
                condition="Nuevo",
                category="SUV",
                image="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
                featured=True,
                rating=4.9,
                monthly_from=2240000,
                color="Azul midnight",
                stock=3,
                description="Diseño premium y gran desempeño."
            )
        ]
        db.add_all(vehicles)
        db.commit()

    if not advisor_exists:
        advisors = [
            Advisor(
                id="adv-1",
                name="Laura Gómez",
                role="Asesora de SUVs",
                response="Responde en 5 min",
                city="Cali"
            ),
            Advisor(
                id="adv-2",
                name="Santiago Rojas",
                role="Crédito y financiación",
                response="Responde en 8 min",
                city="Cali"
            ),
            Advisor(
                id="adv-3",
                name="Daniela Pérez",
                role="Usados certificados",
                response="Disponible ahora",
                city="Palmira"
            )
        ]
        db.add_all(advisors)
        db.commit()
