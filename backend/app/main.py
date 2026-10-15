"""Starter API for public church events and announcements.

All example content is fictional; it is not official church information.
""" 
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Ethiopian Orthodox Platform API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

ANNOUNCEMENTS = [
    {"id": 1, "title": "Welcome to our community platform", "body": "This is an early demo. Official church announcements will appear here after approval.", "date": "Demo content"}
]
EVENTS = [
    {"id": 1, "title": "Community gathering (sample)", "description": "Placeholder event to demonstrate the upcoming events section.", "date": "Date to be confirmed", "location": "Location to be confirmed"}
]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/v1/announcements")
def get_announcements():
    return ANNOUNCEMENTS

@app.get("/api/v1/events")
def get_events():
    return EVENTS
