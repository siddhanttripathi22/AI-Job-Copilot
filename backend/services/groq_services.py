from groq import Groq
import os
from dotenv import load_dotenv
import json

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def clean_json(text: str) -> str:
    text = text.strip()
    text = text.replace("json", "")
    text = text.replace("", "")
    text = text.strip()
    return text


def analyze_resume(resume_text: str) -> dict:
    prompt = """Analyze this resume and return ONLY raw JSON, no markdown, no explanation:
{
    "name": "candidate name",
    "skills": ["skill1", "skill2", "skill3"],
    "experience_years": 1,
    "strengths": ["strength1", "strength2"],
    "improvements": ["tip1", "tip2"],
    "summary": "2 line professional summary"
}

Resume:
""" + resume_text

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert ATS resume analyzer. Return ONLY raw JSON. No markdown, no backticks, no explanation. Just the JSON object."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    result = clean_json(response.choices[0].message.content)
    return json.loads(result)


def analyze_jd_match(resume_text: str, jd_text: str) -> dict:
    prompt = """Compare this resume with the job description.
Return ONLY raw JSON, no markdown, no explanation:
{
    "match_score": 75,
    "matching_skills": ["skill1", "skill2"],
    "missing_skills": ["skill1", "skill2"],
    "strengths": ["point1", "point2"],
    "suggestions": ["tip1", "tip2"],
    "verdict": "Good Match"
}

Resume:
""" + resume_text + """

Job Description:
""" + jd_text

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert ATS system. Return ONLY raw JSON. No markdown, no backticks, no explanation."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    result = clean_json(response.choices[0].message.content)
    print("JD AI Response:", result[:200])
    return json.loads(result)


def generate_cover_letter(
    resume_text: str,
    jd_text: str,
    company_name: str
) -> str:
    prompt = """Write a professional cover letter for:
Company: """ + company_name + """

Resume:
""" + resume_text + """

Job Description:
""" + jd_text + """

Rules:
- 3 paragraphs only
- Professional but warm tone
- Highlight matching skills
- End with call to action
- No placeholders like [Your Name]"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert cover letter writer. Write complete, professional cover letters."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.5
    )

    return response.choices[0].message.content
def analyze_with_rag(context: str, jd_text: str, company_name: str) -> dict:
   prompt = """You are an expert system and career coach. Analyze this candidate's
   resume and relevent experience against the job description.Return only this raw json ,no markdown,no explanation:
   {
    "match_score": 75,
    "matching_skills": ["skill1", "skill2"],
    "missing_skills": ["skill1", "skill2"],
    "strengths": ["point1", "point2"],
    "suggestions": ["tip1", "tip2"],
    "verdict": "Good Match",
    "improvements": ["tip1", "tip2"],
    "summary": "2 line professional summary"
   }
   Candidate's Relevent Experience:""" + context + """
   Job Description:""" + jd_text + """
   Company:""" + company_name
   response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert ATS system and career coach. Return ONLY raw JSON. No markdown, no backticks, no explanation."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )
   result = clean_json(response.choices[0].message.content)
   print("RAG AI Response:", result[:200])
   return json.loads(result)
def generate_cover_letter_with_rag(
    context: str,
    jd_text: str,
    company_name: str
) -> str:
    prompt = """Write a professional cover letter for:
Company: """ + company_name + """
Candidate's Relevent Experience:""" + context + """
Job Description:
""" + jd_text + """
Rules:
- 3 paragraphs only
-Use only the provide experience details
- Professional but warm tone
- Highlight matching skills
- End with call to action
- No placeholders like [Your Name]"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": "You are an expert cover letter writer. Write complete, professional cover letters using only the provided experience details."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7
    )

    return response.choices[0].message.content