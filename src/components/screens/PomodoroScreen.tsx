import React from 'react';
import { Timer, ArrowLeft, TrendingUp } from 'lucide-react';
import PomodoroTimer from '../pomodoro/PomodoroTimer';
import FocusMonitor from '../monitoring/FocusMonitor';
import type { PomodoroState } from '../../types';

interface PomodoroScreenProps {
  pomodoroState: PomodoroState;
  isFocused: boolean;
  noiseLevel: string;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSubjectChange: (subject: string) => void;
  onViewProgress: () => void;
  onBack: () => void;
}

const PomodoroScreen: React.FC<PomodoroScreenProps> = ({
  pomodoroState,
  isFocused,
  noiseLevel,
  onStart,
  onPause,
  onReset,
  onSubjectChange,
  onViewProgress,
  onBack
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold transition duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Study
        </button>
        
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-purple-700" />
          <h1 className="text-3xl font-bold text-purple-700">Focus Session</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PomodoroTimer
            state={pomodoroState}
            onStart={onStart}
            onPause={onPause}
            onReset={onReset}
            onSubjectChange={onSubjectChange}
          />
        </div>
        
        <div>
          <FocusMonitor
            isFocused={isFocused}
            noiseLevel={noiseLevel}
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200 mb-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">Study Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">During Work Sessions:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Focus on one task at a time</li>
                <li>• Avoid distractions and notifications</li>
                <li>• Take notes on key insights</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">During Breaks:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Step away from your workspace</li>
                <li>• Do light stretching or walking</li>
                <li>• Avoid screens when possible</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={onViewProgress}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 font-semibold rounded-lg shadow-md hover:bg-purple-200 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out"
        >
          <TrendingUp className="w-5 h-5" />
          View Study Progress
        </button>
      </div>
    </div>
  );
};

export default PomodoroScreen;