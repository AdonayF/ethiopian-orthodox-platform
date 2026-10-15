# Run the starter locally

## Requirements
- Node.js supported by Angular 22 (check https://angular.dev/reference/versions)
- Python 3.11 or newer

## Terminal 1 — API
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Open http://localhost:8000/docs for interactive API documentation. Run `pytest` in the same terminal to test the endpoints.

## Terminal 2 — Angular
```bash
cd frontend
npm install
npm start
```

Open http://localhost:4200. The frontend retrieves events and announcements from the running API on port 8000.

## Current limitations
- Example events and announcements are held in memory, not PostgreSQL.
- No admin login or content editing yet.
- URLs are configured for local development only.
- Content is fictional demo material and not official church information.
- This hand-scaffolded starter has not yet been run in CI; resolve any dependency/build issues before deployment.
