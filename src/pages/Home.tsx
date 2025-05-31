import React from 'react';
import { Link } from 'react-router-dom';
import { useQuiz } from '../hooks/useQuiz';
import { useAuth } from '../hooks/useAuth';
import { Clock, BookOpen, Star, ArrowRight } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: React.FC = () => {
  const { quizzes, loading } = useQuiz();
  const { user } = useAuth();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Programming Quiz App
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          Test your programming knowledge with interactive quizzes covering various languages and concepts.
          Track your progress and improve your skills!
        </p>
        {!user && (
          <div className="mt-8 space-x-4">
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{quizzes.length}</p>
              <p className="text-gray-600">Available Quizzes</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Star className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {new Set(quizzes.map(q => q.language)).size}
              </p>
              <p className="text-gray-600">Programming Languages</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {quizzes.reduce((total, quiz) => total + quiz.questions.length, 0)}
              </p>
              <p className="text-gray-600">Total Questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {quiz.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {quiz.language}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {quiz.questions.length} questions
                  </span>
                  {quiz.timeLimit && (
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {quiz.timeLimit} min
                    </span>
                  )}
                </div>

                {user ? (
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Sign in to start
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
