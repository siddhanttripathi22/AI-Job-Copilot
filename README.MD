# AI Job Copilot

I built this because I was tired of doing the same 
things manually for every job application.

Rewriting resume. Guessing if I'm a good fit. 
Writing cover letters from scratch. Every. Single. Time.

So I spent 15 days building something that does it for me.

---

## What it does

Upload your resume once. Paste any job description.
Get everything at once:

- Match score — are you actually a fit?
- Skills you have vs skills you're missing
- CV improvement suggestions
- A personalized cover letter

No 10 different tools. Just one thing that works.

---

## What made this different from other projects

Most of my previous projects were standard CRUD apps.
This one required me to think differently.

The hardest part was RAG — Retrieval Augmented Generation.

I had read about it. Watched videos. Understood the concept.
But implementing it was a different thing entirely.

The idea is simple: instead of sending your entire resume 
to the AI every time (which is slow and expensive), 
you break it into chunks, store them in a vector database, 
and only send the relevant parts based on the job description.

Getting ChromaDB, Sentence Transformers, and the Groq API 
to actually work together — that took the most time.
Lots of JSON parse errors. Lots of empty responses. 
Lots of debugging at weird hours.

But it works now. And I understand why it works.
That's the part that matters.

---

## What I learned

Before this project, RAG was just a term I knew.
Now I know:
- How to chunk text properly (and why overlap matters)
- How embeddings work — text converted to numbers
- How vector similarity search finds relevant content
- Why sending less context to AI gives better results

I also learned that AI doesn't "think" — it predicts.
Understanding that changed how I write prompts.
Getting consistent JSON from an LLM took way more 
iteration than I expected.

---

## Tech Stack

**Frontend**
- Next.js 14
- Tailwind CSS
- Context API + useReducer

**Backend**
- FastAPI (Python)
- PyPDF2 for PDF processing

**AI + RAG**
- Groq API (Llama 3.3 70B)
- ChromaDB — vector database
- Sentence Transformers (all-MiniLM-L6-v2)
- Custom prompt engineering

---

## How to run locally

**Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload