from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from services.groq_services import analyze_jd_match
import PyPDF2
import io


router=APIRouter()
def extract_pdf_text(pdf_bytes:bytes)->str:
    reader=PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
    text=""
    for page in reader.pages:
        text+=page.extract_text()
        return text
@router.post("/analyze")
async def analyze_jd(file:UploadFile=File(...),jd_text:str=Form(...)):
    contents=await file.read()
    resume_text=extract_pdf_text(contents)
    result=analyze_jd_match(resume_text,jd_text)
    return JSONResponse(content={
        "success": True,
        "data": result
    })