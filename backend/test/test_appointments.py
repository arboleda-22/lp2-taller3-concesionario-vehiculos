def test_create_appointment(client):
    payload = {
        "vehicleId": "car-2",
        "name": "Eder",
        "phone": "3001234567",
        "date": "2026-06-10T10:00:00",
        "message": "Quiero realizar una prueba de manejo",
        "userId": "me"
    }

    response = client.post("/api/appointments", json=payload)
    assert response.status_code == 201

    body = response.json()
    assert body["success"] is True
    assert body["data"]["vehicle_id"] == "car-2"
    assert body["data"]["status"] == "pending"


def test_create_appointment_vehicle_not_found(client):
    payload = {
        "vehicleId": "car-999",
        "name": "Eder",
        "phone": "3001234567",
        "date": "2026-06-10T10:00:00"
    }

    response = client.post("/api/appointments", json=payload)
    assert response.status_code == 404
