from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from routers import topics_router, exhibits_router, user_router, visits_router, chat_router, recommendations_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Hacksgiving 2024 API",
    description="API for the Hacksgiving 2024 Discovery World",
    version="0.1.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return RedirectResponse(url="/docs")

@app.get("/health")
def health():
    return {"status": "ok"}

# Include routers
app.include_router(topics_router)
app.include_router(exhibits_router)
app.include_router(user_router)
app.include_router(visits_router)
app.include_router(chat_router)
app.include_router(recommendations_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)