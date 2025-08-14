import React from 'react';
import { ScrollText, Brain, ArrowLeft, Timer } from 'lucide-react';
import SummaryDisplay from '../study/SummaryDisplay';
import QuizDisplay from '../study/QuizDisplay';
import type { QuizQuestion } from '../../types';

interface StudyScreenProps {
  summary: string;
  quiz: QuizQuestion[];
  currentQuizAnswers: Record<number, string>;
  showQuizResults: boolean;
  onAnswerChange: (questionIndex: number, selectedOption: string) => void;
  onCheckAnswers: () => void;
  onStartPomodoro: () => void;
  onBack: () => void;
}

const StudyScreen: React.FC<StudyScreenProps> = ({
  summary,
  quiz,
  currentQuizAnswers,
  showQuizResults,
  onAnswerChange,
  onCheckAnswers,
  onStartPomodoro,
  onBack
}) => {
  const quizScore = showQuizResults ? 
    quiz.reduce((score, q, index) => 
      score + (currentQuizAnswers[index] === q.correctAnswer ? 1 : 0), 0
    ) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 font-semibold transition duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Notes
        </button>
        
        <div className="flex items-center gap-2">
          <ScrollText className="w-6 h-6 text-purple-700" />
          <h1 className="text-3xl font-bold text-purple-700">Study Session</h1>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl border border-blue-200 mb-8">
        <SummaryDisplay summary={summary} />
        
        <QuizDisplay
          quiz={quiz}
          currentQuizAnswers={currentQuizAnswers}
          showQuizResults={showQuizResults}
          onAnswerChange={onAnswerChange}
          onCheckAnswers={onCheckAnswers}
        />

        {showQuizResults && quiz.length > 0 && (
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-purple-700 mb-2">Quiz Complete!</h3>
              <p className="text-xl text-gray-700">
                Your Score: <span className="font-bold text-purple-600">{quizScore}/{quiz.length}</span>
                {quizScore === quiz.length && <span className="text-green-600 ml-2">🎉 Perfect!</span>}
              </p>
            </div>
            
            <div className="text-center">
              <button
                onClick={onStartPomodoro}
                className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Timer className="w-6 h-6" />
                Start Focused Study Session
              </button>
              <p className="mt-3 text-gray-600">
                Ready to dive deeper? Start a Pomodoro session to reinforce your learning.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyScreen;