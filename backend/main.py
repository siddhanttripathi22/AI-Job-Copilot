from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.resume import router as resume_router
from routes.jd_analysis import router as jd_router
from routes.cover_letter import router as cover_router
from routes.analyze import router as analyze_router



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"], 
    allow_headers=["*"],
    
)
app.include_router(
    resume_router,
    prefix="/resume",
    tags=["Resume"]
)
app.include_router(
    jd_router,
    prefix="/jd",
    tags=["JD Analysis"]
)

app.include_router(
    cover_router,
    prefix="/cover-letter",
    tags=["Cover Letter"]
)
app.include_router(
    analyze_router,
    prefix="/analyze",
    tags=["FullAnalysis"]
)


@app.get("/")
def root():
    return {"message":"AI Job Copilot Backend is running!"}
