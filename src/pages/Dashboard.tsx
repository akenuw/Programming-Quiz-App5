import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useQuiz } from '../hooks/useQuiz';
import { User, BookOpen, Trophy, Clock, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { quizzes } = useQuiz();

  // Mock data for demonstration
  const mockStats = {
    quizzesCompleted: 5,
    averageScore: 78,
    totalTimeSpent: 120, // minutes
    bestScore: 95,
    recentQuizzes: [
      { title: 'JavaScript Fundamentals', score: 85, date: '2024-01-15' },
      { title: 'Python Basics', score: 92, date: '2024-01-14' },
      { title: 'React Concepts', score: 78, date: '2024-01-13' },
    ]
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.displayName || user?.email}!
            </h1>
            <p className="text-gray-600">
              Ready to continue your programming journey?
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {mockStats.quizzesCompleted}
              </p>
              <p className="text-gray-600">Quizzes Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {mockStats.averageScore}%
              </p>
              <p className="text-gray-600">Average Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(mockStats.totalTimeSpent)}
              </p>
              <p className="text-gray-600">Time Spent</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {mockStats.bestScore}%
              </p>
              <p className="text-gray-600">Best Score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Quizzes</h2>
          <div className="space-y-4">
            {mockStats.recentQuizzes.map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{quiz.title}</p>
                  <p className="text-sm text-gray-600">{quiz.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${
                    quiz.score >= 80 ? 'text-green-600' : 
                    quiz.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {quiz.score}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Quizzes</h2>
          <div className="space-y-3">
            {quizzes.slice(0, 3).map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{quiz.title}</p>
                  <p className="text-sm text-gray-600">{quiz.language} • {quiz.difficulty}</p>
                </div>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Progress</h2>
        <div className="space-y-4">
          {['JavaScript', 'Python', 'React'].map((language) => {
            const progress = Math.floor(Math.random() * 100); // Mock progress
            return (
              <div key={language}>
                <div className="flex justify-between text-sm font-medium text-gray-900 mb-1">
                  <span>{language}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
