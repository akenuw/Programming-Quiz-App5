import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { useAuth } from '../hooks/useAuth';
import { Clock, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const QuizPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getQuizById, submitQuizAttempt } = useQuiz();
  const { user } = useAuth();

  const [quiz, setQuiz] = useState(getQuizById(id!));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!quiz) {
      navigate('/');
      return;
    }

    if (quiz.timeLimit) {
      setTimeLeft(quiz.timeLimit * 60); // Convert minutes to seconds
    }
  }, [quiz, navigate]);

  useEffect(() => {
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      handleSubmitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev! - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!user || !quiz) return;

    setIsSubmitting(true);
    try {
      const timeSpent = quiz.timeLimit ? (quiz.timeLimit * 60) - (timeLeft || 0) : 0;
      const result = await submitQuizAttempt(user.uid, quiz.id, answers, timeSpent);
      
      // Navigate to results page with the result data
      navigate('/quiz-result', { 
        state: { 
          result, 
          quiz,
          answers 
        } 
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quiz) {
    return (
      <div className="text-center">
        <p className="text-gray-600">Quiz not found</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          {timeLeft !== null && (
            <div className="flex items-center space-x-2 text-lg font-medium">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className={timeLeft < 300 ? 'text-red-600' : 'text-gray-900'}>
                {formatTime(timeLeft)}
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <span>
            {answeredQuestions} of {quiz.questions.length} answered
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {currentQuestion.question}
        </h2>

        {currentQuestion.codeSnippet && (
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-6 font-mono text-sm overflow-x-auto">
            <pre>{currentQuestion.codeSnippet}</pre>
          </div>
        )}

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion.id, index)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                answers[currentQuestion.id] === index
                  ? 'border-blue-500 bg-blue-50 text-blue-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center">
                <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                  {answers[currentQuestion.id] === index && (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  )}
                </span>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-3">
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Quiz'}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
