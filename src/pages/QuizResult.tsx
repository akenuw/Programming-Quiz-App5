import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Quiz, QuizResult } from '../types/quiz';
import { CheckCircle, XCircle, Clock, Award, Home, RotateCcw } from 'lucide-react';

interface LocationState {
  result: QuizResult;
  quiz: Quiz;
  answers: { [questionId: string]: number };
}

const QuizResultPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  if (!state || !state.result || !state.quiz) {
    return (
      <div className="text-center">
        <p className="text-gray-600">No quiz results found</p>
        <Link to="/" className="text-blue-600 hover:text-blue-500">
          Go back to home
        </Link>
      </div>
    );
  }

  const { result, quiz, answers } = state;

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! Outstanding performance!';
    if (percentage >= 80) return 'Great job! Well done!';
    if (percentage >= 70) return 'Good work! Keep it up!';
    if (percentage >= 60) return 'Not bad! Room for improvement.';
    return 'Keep practicing! You\'ll get better!';
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Results Header */}
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="mb-6">
          <Award className={`h-16 w-16 mx-auto mb-4 ${getScoreColor(result.percentage)}`} />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h1>
          <p className="text-lg text-gray-600">{quiz.title}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(result.percentage)}`}>
              {result.percentage}%
            </div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {result.correctAnswers}
            </div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {result.incorrectAnswers}
            </div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {formatTime(result.timeSpent)}
            </div>
            <div className="text-sm text-gray-600">Time Spent</div>
          </div>
        </div>

        <p className={`text-lg font-medium ${getScoreColor(result.percentage)}`}>
          {getScoreMessage(result.percentage)}
        </p>
      </div>

      {/* Question Review */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Question Review</h2>
        <div className="space-y-6">
          {quiz.questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-2">
                      Question {index + 1}: {question.question}
                    </h3>

                    {question.codeSnippet && (
                      <div className="bg-gray-900 text-gray-100 p-3 rounded-lg mb-3 font-mono text-sm overflow-x-auto">
                        <pre>{question.codeSnippet}</pre>
                      </div>
                    )}

                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        let optionClass = 'p-3 rounded-lg border ';
                        
                        if (optionIndex === question.correctAnswer) {
                          optionClass += 'border-green-500 bg-green-50 text-green-900';
                        } else if (optionIndex === userAnswer && !isCorrect) {
                          optionClass += 'border-red-500 bg-red-50 text-red-900';
                        } else {
                          optionClass += 'border-gray-200 bg-gray-50 text-gray-700';
                        }

                        return (
                          <div key={optionIndex} className={optionClass}>
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              <div className="flex space-x-2">
                                {optionIndex === question.correctAnswer && (
                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                    Correct
                                  </span>
                                )}
                                {optionIndex === userAnswer && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    Your Answer
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {question.explanation && (
                      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-900">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
        <Link
          to={`/quiz/${quiz.id}`}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <RotateCcw className="h-5 w-5 mr-2" />
          Retake Quiz
        </Link>
      </div>
    </div>
  );
};

export default QuizResultPage;
