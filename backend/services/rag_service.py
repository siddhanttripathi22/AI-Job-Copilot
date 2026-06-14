import chromadb
from chromadb.utils import embedding_functions


sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)


chroma_client = chromadb.EphemeralClient()


# ─── FUNCTION 1: CHUNK BANAO ──────────────────────────────────
def create_chunks(text: str, chunk_size: int = 400, overlap: int = 50) -> list[str]:
    """
    Text ko chhote tukdon mein todta hai.
    
    chunk_size = 400 characters per chunk
    overlap = 50 characters overlap between chunks
    
    Overlap kyun?
    "React developer with 3 years"
    "3 years experience in Node"
    
    Bina overlap: "3 years" dono chunks mein nahi hoga
    Overlap ke saath: context nahi tuta
    """
    chunks = []
    start = 0
    
    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end]
        
        # Sirf meaningful chunks lo
        # Khaali ya bahut chhote chunks skip karo
        if len(chunk.strip()) > 50:
            chunks.append(chunk.strip())
        
        # Next chunk start = current start + chunk_size - overlap
        start = end - overlap
    
    return chunks


# ─── FUNCTION 2: RESUME STORE KARO ───────────────────────────
def store_resume_in_rag(resume_text: str, session_id: str) -> dict:
    """
    Resume ko chunks mein todke ChromaDB mein store karta hai.
    
    session_id kyun?
    Agar kal multiple users hon toh
    har user ka data alag collection mein
    Abhi ek user hai toh session_id = "user_session"
    """
    
    # Collection name - session specific
    collection_name = f"resume_{session_id}"
    
    # Agar pehle se collection hai toh delete karo
    # Replace resume functionality ke liye
    try:
        chroma_client.delete_collection(collection_name)
    except:
        pass  # Pehli baar hai toh collection nahi hogi
    
    # Naya collection banao
    # embedding_function = text → numbers karne ke liye
    collection = chroma_client.create_collection(
        name=collection_name,
        embedding_function=sentence_transformer_ef
    )
    
    # Chunks banao
    chunks = create_chunks(resume_text)
    
    # Har chunk ko store karo
    # ChromaDB automatically embedding banayega
    collection.add(
        documents=chunks,           # actual text
        ids=[f"chunk_{i}" for i in range(len(chunks))]  # unique ids
    )
    
    return {
        "stored": True,
        "chunks_count": len(chunks),
        "collection": collection_name
    }


# ─── FUNCTION 3: RELEVANT CHUNKS NIKALO ──────────────────────
def get_relevant_chunks(query: str, session_id: str, n_results: int = 3) -> list[str]:
    """
    Query ke basis pe most relevant chunks dhundta hai.
    
    Kaise kaam karta hai?
    1. Query ko numbers mein convert karo
    2. ChromaDB mein similar numbers dhundo
    3. Top n_results chunks return karo
    
    n_results = 3 kyun?
    Zyada chunks = zyada tokens = slow + expensive
    3 chunks = enough context for AI
    """
    
    collection_name = f"resume_{session_id}"
    
    try:
        collection = chroma_client.get_collection(
            name=collection_name,
            embedding_function=sentence_transformer_ef
        )
        
        # Similarity search
        results = collection.query(
            query_texts=[query],
            n_results=n_results
        )
        
        # Results format:
        # {"documents": [["chunk1", "chunk2", "chunk3"]]}
        return results["documents"][0]
        
    except Exception as e:
        print(f"RAG Error: {e}")
        return []


# ─── FUNCTION 4: RAG SE ANALYSIS ─────────────────────────────
def get_rag_context(jd_text: str, session_id: str) -> str:
    """
    JD ke basis pe resume se relevant context nikalta hai.
    
    Ye function:
    1. JD se key queries banata hai
    2. Har query ke liye relevant chunks dhundta hai
    3. Sab combine karke context banata hai
    4. Ye context AI ko bheja jayega
    """
    
    # Multiple queries - different aspects cover karo
    queries = [
        "technical skills and programming languages",
        "work experience and projects",
        "education and certifications",
        jd_text[:200]  # JD ka pehla hissa bhi query mein
    ]
    
    all_chunks = []
    seen = set()  # Duplicate chunks avoid karo
    
    for query in queries:
        chunks = get_relevant_chunks(query, session_id, n_results=2)
        for chunk in chunks:
            if chunk not in seen:
                all_chunks.append(chunk)
                seen.add(chunk)
    
    # Combine chunks into context
    context = "\n\n".join(all_chunks)
    return context