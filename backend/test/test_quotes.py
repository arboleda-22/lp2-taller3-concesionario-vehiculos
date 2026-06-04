def test_create_quote(client):
    payload = {
        "vehicleId": "car-1",
        "customer": {
            "name": "Eder",
            "email": "eder@example.com",
            "phone": "3001234567"
        },
        "simulation": {
            "vehicleValue": 129900000,
            "initialFee": 30,
            "months": 60,
            "rate": 1.25,
            "financing": {
                "installment": 1980000
            }
        },
        "userId": "me"
    }

    response = client.post("/api/quotes", json=payload)
    assert response.status_code == 201

    body = response.json()
    assert body["success"] is True
    assert body["data"]["vehicle_id"] == "car-1"
    assert body["data"]["status"] == "pending"


def test_create_quote_vehicle_not_found(client):
    payload = {
        "vehicleId": "car-999",
        "customer": {
            "name": "Eder",
            "email": "eder@example.com",
            "phone": "3001234567"
        }
    }

    response = client.post("/api/quotes", json=payload)
    assert response.status_code == 404