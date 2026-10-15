# Backend (FastAPI)

Starter API for demo announcements and events. Data is currently hardcoded sample content; PostgreSQL, login, and content editing are not implemented yet.

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

API docs: http://localhost:8000/docs

Tests: `pytest`
