from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="PayPilot AI",
    description="AI-powered financial assistance platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def home():
    return {
        "message": "Welcome to PayPilot AI!",
        "status": "Backend is running"
    }


@app.get("/api/health")
def health_check():
    return {
        "project": "PayPilot AI",
        "status": "healthy"
    }


@app.get("/api/features")
def get_features():
    return {
        "features": [
            "AI Shopping Assistant",
            "Personal Finance AI",
            "Fraud Detection",
            "Group Expenses",
            "Microbusiness Tools",
            "Financial What-If Simulator",
            "Multilingual Support"
        ]
    }