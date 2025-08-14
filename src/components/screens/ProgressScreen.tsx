import React from 'react';
import { TrendingUp, ArrowLeft, BookOpen, Timer, Brain } from 'lucide-react';
import ProgressTracker from '../progress/ProgressTracker';
import type { StudySession } from '../../types';

interface ProgressScreenProps {
  studySessions: StudySession[];
  totalStudyMinutes: number;
  onBack: () => void;
  onStartNewSession: () => void;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({
  studySessions,
  totalStudyMinutes,
  onBack,
  onStartNewSession
}) => {
  const workSessions = studySessions.filter(s => s.type === 'work');
  const averageSessionLength = workSessions.length > 0 
    ? totalStudyMinutes / workSessions.length 
    : 0;

  const todaysSessions = studySessions.filter(session => {
    if (!session.timestamp) return false;
    const sessionDate = new Date(session.timestamp.toDate());
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  });

  const todaysStudyTime = todaysSessions
    .filter(s => s.type === 'work')
    .reduce((acc, session) => acc + (session.durationMinutes || 0), 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold transition duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-700" />
          <h1 className="text-3xl font-bold text-purple-700">Study Progress</h1>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <Timer className="w-8 h-8 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Total Study Time</h3>
          </div>
          <p className="text-3xl font-bold text-purple-700">{totalStudyMinutes.toFixed(0)}</p>
          <p className="text-gray-600">minutes</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Study Sessions</h3>
          </div>
          <p className="text-3xl font-bold text-green-700">{workSessions.length}</p>
          <p className="text-gray-600">completed</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Today's Focus</h3>
          </div>
          <p className="text-3xl font-bold text-blue-700">{todaysStudyTime.toFixed(0)}</p>
          <p className="text-gray-600">minutes today</p>
        </div>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ProgressTracker
            studySessions={studySessions}
            totalStudyMinutes={totalStudyMinutes}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
          <h3 className="text-xl font-semibold text-purple-700 mb-6">Study Insights</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Average Session Length</h4>
              <p className="text-2xl font-bold text-purple-700">
                {averageSessionLength.toFixed(1)} minutes
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Most Studied Subject</h4>
              <p className="text-lg font-semibold text-green-700">
                {workSessions.length > 0 
                  ? (() => {
                      const subjectCounts = workSessions.reduce((acc, session) => {
                        acc[session.subject || 'No Subject'] = (acc[session.subject || 'No Subject'] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>);
                      const entries = Object.entries(subjectCounts);
                      const sortedEntries = entries.sort(([,a], [,b]) => b - a);
                      return sortedEntries[0]?.[0] || 'No data';
                    })()
                  : 'No sessions yet'
                }
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Study Streak</h4>
              <p className="text-lg font-semibold text-blue-700">
                {todaysSessions.length > 0 ? 'Active today! 🔥' : 'Start studying to build your streak'}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onStartNewSession}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out"
            >
              <BookOpen className="w-5 h-5" />
              Start New Study Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressScreen;