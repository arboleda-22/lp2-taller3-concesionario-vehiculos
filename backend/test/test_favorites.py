def test_get_empty_favorites(client):
    response = client.get("/api/users/me/favorites")
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert body["data"] == []


def test_add_favorite(client):
    payload = {
        "vehicleId": "car-1",
        "isFavorite": True
    }

    response = client.post("/api/users/me/favorites", json=payload)
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert "car-1" in body["data"]


def test_remove_favorite(client):
    add_payload = {
        "vehicleId": "car-1",
        "isFavorite": True
    }

    client.post("/api/users/me/favorites", json=add_payload)

    remove_payload = {
        "vehicleId": "car-1",
        "isFavorite": False
    }

    response = client.post("/api/users/me/favorites", json=remove_payload)
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert "car-1" not in body["data"]