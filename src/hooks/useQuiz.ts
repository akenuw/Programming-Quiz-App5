import { useState, useEffect } from 'react';
import { Quiz, QuizAttempt, QuizResult } from '../types/quiz';
import { sampleQuizzes } from '../data/sampleQuizzes';

export const useQuiz = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // For now, we'll use sample data
    // In a real app, this would fetch from Firebase
    setQuizzes(sampleQuizzes);
    setLoading(false);
  }, []);

  const getQuizById = (id: string): Quiz | undefined => {
    return quizzes.find(quiz => quiz.id === id);
  };

  const getQuizzesByLanguage = (language: string): Quiz[] => {
    return quizzes.filter(quiz => quiz.language.toLowerCase() === language.toLowerCase());
  };

  const getQuizzesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): Quiz[] => {
    return quizzes.filter(quiz => quiz.difficulty === difficulty);
  };

  const calculateQuizResult = (
    quiz: Quiz,
    answers: { [questionId: string]: number },
    timeSpent: number
  ): QuizResult => {
    let correctAnswers = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const incorrectAnswers = totalQuestions - correctAnswers;

    return {
      score,
      totalQuestions,
      percentage,
      timeSpent,
      correctAnswers,
      incorrectAnswers,
      answers
    };
  };

  const submitQuizAttempt = async (
    userId: string,
    quizId: string,
    answers: { [questionId: string]: number },
    timeSpent: number
  ): Promise<QuizResult> => {
    try {
      const quiz = getQuizById(quizId);
      if (!quiz) {
        throw new Error('Quiz not found');
      }

      const result = calculateQuizResult(quiz, answers, timeSpent);

      // In a real app, this would save to Firebase
      const attempt: QuizAttempt = {
        id: `attempt-${Date.now()}`,
        userId,
        quizId,
        answers,
        score: result.score,
        totalQuestions: result.totalQuestions,
        timeSpent,
        completedAt: new Date()
      };

      console.log('Quiz attempt submitted:', attempt);
      return result;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  return {
    quizzes,
    loading,
    error,
    getQuizById,
    getQuizzesByLanguage,
    getQuizzesByDifficulty,
    calculateQuizResult,
    submitQuizAttempt
  };
};
