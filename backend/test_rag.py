from services.rag_service import (
    store_resume_in_rag,
    get_relevant_chunks,
    get_rag_context
)

# Fake resume text
resume_text = """
Siddhant Tripathi - Full Stack Developer
Skills: React.js, Node.js, Python, MongoDB, FastAPI
Experience: Indian Oil Corporation - 9 months
Built inventory management system for 50+ supervisors
Used Redux for state management
Implemented REST APIs with Node.js
Education: B.Tech CSE from RKGIT 2023
Projects: Local ChatGPT with Ollama, Protocol Monitor
"""

# Fake JD
jd_text = """
Looking for React developer with Node.js experience
Must know REST APIs and MongoDB
"""

print("Step 1: Storing resume...")
result = store_resume_in_rag(resume_text, "test_session")
print(f"Stored {result['chunks_count']} chunks")

print("\nStep 2: Getting relevant chunks...")
chunks = get_relevant_chunks("React experience", "test_session")
for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}: {chunk[:100]}...")

print("\nStep 3: Getting full context...")
context = get_rag_context(jd_text, "test_session")
print(f"Context length: {len(context)} chars")
print(f"Context preview: {context[:200]}...")

print("\n✅ RAG Working!")