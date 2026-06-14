from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse
from services.groq_services import (
    analyze_resume,
    analyze_with_rag,
    generate_cover_letter_with_rag
)
from services.rag_service import (
    store_resume_in_rag,
    get_rag_context
)
from services.pdf_service import extract_text_from_pdf
import uuid

router = APIRouter()


@router.post("/full-analysis")
async def full_analysis(
    file: UploadFile = File(...),
    jd_text: str = Form(...),
    company_name: str = Form(...)
):
    """
    Main analysis endpoint.
    
    Flow:
    1. PDF → Text extract karo
    2. Text → RAG mein store karo (chunks + embeddings)
    3. JD → Relevant chunks nikalo
    4. RAG context → AI ko bhejo
    5. Results return karo
    
    Pehle wale se difference:
    Pehle: Poora resume AI ko jaata tha
    Ab: Sirf relevant chunks jaate hain
    """
    
    # Step 1: PDF se text nikalo
    contents = await file.read()
    resume_text = extract_text_from_pdf(contents)
    
    print(f"Resume text length: {len(resume_text)} chars")
    
    # Step 2: Session ID banao
    # Har request ke liye unique ID
    # Taaki multiple users ke data mix na ho
    session_id = str(uuid.uuid4())[:8]
    
    # Step 3: RAG mein store karo
    storage_result = store_resume_in_rag(resume_text, session_id)
    print(f"RAG stored: {storage_result['chunks_count']} chunks")
    
    # Step 4: JD ke basis pe relevant context nikalo
    rag_context = get_rag_context(jd_text, session_id)
    print(f"RAG context length: {len(rag_context)} chars")
    
    # Step 5: RAG context se analysis karo
    # Note: Ab poora resume nahi ja raha
    # Sirf relevant chunks ja rahe hain
    analysis = analyze_with_rag(rag_context, jd_text, company_name)
    
    # Step 6: RAG context se cover letter banao
    cover_letter = generate_cover_letter_with_rag(
        rag_context, jd_text, company_name
    )
    
    return JSONResponse(content={
        "success": True,
        "resume_analysis": {
            "name": analysis.get("name", ""),
            "skills": analysis.get("matching_skills", []),
            "experience_years": analysis.get("experience_years", 0),
            "strengths": analysis.get("strengths", []),
            "improvements": analysis.get("improvements", []),
            "summary": analysis.get("summary", "")
        },
        "jd_match": {
            "match_score": analysis.get("match_score", 0),
            "matching_skills": analysis.get("matching_skills", []),
            "missing_skills": analysis.get("missing_skills", []),
            "strengths": analysis.get("strengths", []),
            "suggestions": analysis.get("suggestions", []),
            "verdict": analysis.get("verdict", "")
        },
        "cover_letter": cover_letter,
        # Debug info — development mein helpful
        "debug": {
            "chunks_stored": storage_result['chunks_count'],
            "context_length": len(rag_context),
            "session_id": session_id
        }
    })