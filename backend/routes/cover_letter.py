from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from services.groq_services import generate_cover_letter
import PyPDF2
import io

router = APIRouter()

def extract_pdf_text(pdf_bytes: bytes) -> str:
    reader = PyPDF2.PdfReader(io.BytesIO(pdf_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

@router.post("/generate")
async def create_cover_letter(
    file: UploadFile = File(...),
    jd_text: str = Form(...),
    company_name: str = Form(...)
):
    contents = await file.read()
    resume_text = extract_pdf_text(contents)

    letter = generate_cover_letter(
        resume_text,
        jd_text,
        company_name
    )

    return JSONResponse(content={
        "success": True,
        "cover_letter": letter
    })