export interface Question {
  id: string;
  text: string;
  category?: string;
  weight?: number;
}

export interface Domain {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: 'yes' | 'no' | 'partial' | 'na';
  notes?: string;
}

export interface AssessmentState {
  answers: Record<string, Answer>;
  currentDomain: string;
  completedDomains: string[];
}

export interface MaturityLevel {
  level: number;
  name: string;
  description: string;
  color: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  domain: string;
  technologies: string[];
  effort: string;
}