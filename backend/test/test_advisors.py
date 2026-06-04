def test_get_advisors(client):
    response = client.get("/api/advisors")
    assert response.status_code == 200

    body = response.json()
    assert body["success"] is True
    assert isinstance(body["data"], list)
    assert len(body["data"]) >= 1