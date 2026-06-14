export interface ResumeAnalysis {
  name: string;
  skills: string[];
  experience_years: number;
  strengths: string[];
  improvements: string[];
  summary: string;
}

export interface JDMatch {
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  strengths: string[];
  suggestions: string[];
  verdict: string;
}

export interface AnalysisResult {
  resume_analysis: ResumeAnalysis;
  jd_match: JDMatch;
  cover_letter: string;
}

export interface AppState {
  resumeFile: File | null;
  resumeText: string;
  isResumeUploaded: boolean;
  result: AnalysisResult | null;
  loading: boolean;
}