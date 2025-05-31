export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  language: string;
  codeSnippet?: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  timeLimit?: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  answers: { [questionId: string]: number };
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
  completedAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: Date;
  totalQuizzes: number;
  averageScore: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpent: number;
  correctAnswers: number;
  incorrectAnswers: number;
  answers: { [questionId: string]: number };
}
