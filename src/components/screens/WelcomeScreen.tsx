import React from 'react';
import { BookOpen, Brain, Timer, TrendingUp, ArrowRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStartStudying: () => void;
  onViewProgress: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartStudying, onViewProgress }) => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <BookOpen className="w-16 h-16 text-purple-700" />
          <h1 className="text-5xl sm:text-6xl font-extrabold text-purple-700 leading-tight">
            StudyWise AI
          </h1>
        </div>
        <p className="text-xl sm:text-2xl text-purple-600 mb-8">
          Your Personal AI-Powered Study Assistant
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your learning with AI-generated summaries, interactive quizzes, 
          focused study sessions, and comprehensive progress tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Learning</h3>
          <p className="text-gray-600">
            Get instant summaries and personalized quizzes from your study materials
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <Timer className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Pomodoro Focus</h3>
          <p className="text-gray-600">
            Stay focused with timed study sessions and break reminders
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Progress Tracking</h3>
          <p className="text-gray-600">
            Monitor your study habits and track your learning journey
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={onStartStudying}
          className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Start Studying
          <ArrowRight className="w-6 h-6" />
        </button>
        
        <div>
          <button
            onClick={onViewProgress}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition duration-300 ease-in-out"
          >
            <TrendingUp className="w-5 h-5" />
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;