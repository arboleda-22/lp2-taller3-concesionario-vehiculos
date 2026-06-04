def test_get_vehicles(client):
    response = client.get("/api/vehicles")
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert isinstance(body["data"], list)
    assert len(body["data"]) >= 1


def test_get_vehicle_by_id(client):
    response = client.get("/api/vehicles/car-1")
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert body["data"]["id"] == "car-1"


def test_get_vehicle_not_found(client):
    response = client.get("/api/vehicles/car-999")
    assert response.status_code == 404