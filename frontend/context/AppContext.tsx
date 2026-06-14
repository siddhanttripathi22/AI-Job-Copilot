"use client";
import { createContext, useContext, useReducer, ReactNode } from "react";
import { AppState, AnalysisResult } from "@/types";

// Initial State
const initialState: AppState = {
  resumeFile: null,
  resumeText: "",
  isResumeUploaded: false,
  result: null,
  loading: false,
};

// Actions
type Action =
  | { type: "SET_RESUME"; payload: { file: File; text: string } }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_RESULT"; payload: AnalysisResult }
  | { type: "CLEAR_RESULT" }
  | { type: "REMOVE_RESUME" };

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_RESUME":
      return {
        ...state,
        resumeFile: action.payload.file,
        resumeText: action.payload.text,
        isResumeUploaded: true,
        result: null,
      };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_RESULT":
      return { ...state, result: action.payload, loading: false };
    case "CLEAR_RESULT":
      return { ...state, result: null };
    case "REMOVE_RESUME":
      return {
        ...state,
        resumeFile: null,
        resumeText: "",
        isResumeUploaded: false,
        result: null,
      };
    default:
      return state;
  }
}

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}