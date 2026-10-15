from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_announcements():
    response = client.get("/api/v1/announcements")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_events():
    response = client.get("/api/v1/events")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
