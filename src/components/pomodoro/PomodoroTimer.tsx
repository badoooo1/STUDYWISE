import React from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import type { PomodoroState } from '../../types';

interface PomodoroTimerProps {
  state: PomodoroState;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSubjectChange: (subject: string) => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  state,
  onStart,
  onPause,
  onReset,
  onSubjectChange
}) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getModeDisplay = (): string => {
    switch (state.mode) {
      case 'work':
        return `Work Session (${state.sessionsCompleted} completed)`;
      case 'short-break':
        return 'Short Break';
      case 'long-break':
        return 'Long Break';
      default:
        return 'Work Session';
    }
  };

  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Timer className="w-6 h-6 text-purple-700" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">Pomodoro Timer</h2>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-lg text-gray-600 mb-2">
          {getModeDisplay()}
        </p>
        <p className="text-6xl font-bold text-purple-800 tracking-wide">
          {formatTime(state.timeLeft)}
        </p>
      </div>
      
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={onStart}
          disabled={state.isActive}
          className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          Start
        </button>
        <button
          onClick={onPause}
          disabled={!state.isActive}
          className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Pause className="w-4 h-4" />
          Pause
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
      
      <div className="mt-4">
        <label htmlFor="subject" className="block text-gray-700 text-sm font-bold mb-2">
          Subject for this session:
        </label>
        <input
          type="text"
          id="subject"
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-base"
          value={state.currentSubject}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="e.g., React Development"
          disabled={state.isActive}
        />
      </div>
    </section>
  );
};

export default PomodoroTimer;