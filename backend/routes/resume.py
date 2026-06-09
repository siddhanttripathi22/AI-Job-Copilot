from fastapi import APIRouter, UploadFile, File
import PyPDF2
from fastapi.responses import JSONResponse
from services.groq_services import analyze_resume
import io

router = APIRouter()

def extract_pdf_text(pdf_byte:bytes)->str:
    pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_byte))
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text
@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    contents=await file.read()
    resume_text=extract_pdf_text(contents)
    analysis=analyze_resume(resume_text)
    return JSONResponse(content={
        "success": True,
        "data": analysis

    })