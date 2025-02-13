import { ReactElement } from "react";

export interface PersonalityTraits {
  socialStyle: number; // How they interact in social settings
  emotionalReadiness: number; // Readiness for relationship
  dateStyle: number; // Dating approach and preferences
  commitment: number; // Attitude towards commitment
  communication: number; // Communication skills
  independence: number; // Level of independence
  career: number; // Career focus and ambition
  flexibility: number;
}

export interface Answer {
  text: string;
  traits: Partial<PersonalityTraits>;
  explanation?: string; // Used for analysis generation
}

export interface Question {
  id: number;
  text: string;
  category:
    | "social"
    | "dating"
    | "lifestyle"
    | "communication"
    | "values"
    | "career";
  icon: ReactElement;
  answers: Answer[];
}
