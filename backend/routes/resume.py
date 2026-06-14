from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from services.groq_services import analyze_resume
from services.pdf_service import extract_text_from_pdf

router = APIRouter()

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    contents = await file.read()
    resume_text = extract_text_from_pdf(contents)
    analysis = analyze_resume(resume_text)
    
    return JSONResponse(content={
        "success": True,
        "data": analysis,
        "raw_text": resume_text[:500]
    })