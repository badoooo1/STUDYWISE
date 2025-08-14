import React from 'react';
import { Brain, Check, X } from 'lucide-react';
import type { QuizQuestion } from '../../types';

interface QuizDisplayProps {
  quiz: QuizQuestion[];
  currentQuizAnswers: Record<number, string>;
  showQuizResults: boolean;
  onAnswerChange: (questionIndex: number, selectedOption: string) => void;
  onCheckAnswers: () => void;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({
  quiz,
  currentQuizAnswers,
  showQuizResults,
  onAnswerChange,
  onCheckAnswers
}) => {
  if (quiz.length === 0) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-purple-700" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">Quiz Time!</h2>
      </div>
      
      {quiz.map((q, qIndex) => (
        <div key={qIndex} className="mb-8 p-6 bg-blue-50 rounded-lg shadow-md border border-blue-200">
          <p className="font-bold text-xl mb-4 text-blue-800">
            {qIndex + 1}. {q.question}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {q.options.map((option, oIndex) => (
              <label
                key={oIndex}
                className={`block p-4 rounded-lg cursor-pointer transition duration-200 ease-in-out
                  ${showQuizResults && option === q.correctAnswer
                    ? 'bg-green-200 border-green-500 shadow-lg'
                    : showQuizResults && currentQuizAnswers[qIndex] === option && option !== q.correctAnswer
                    ? 'bg-red-200 border-red-500 shadow-lg'
                    : currentQuizAnswers[qIndex] === option
                    ? 'bg-purple-200 border-purple-500 shadow-md'
                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                  }
                  flex items-center text-gray-800 text-lg sm:text-base shadow-sm`}
              >
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={option}
                  checked={currentQuizAnswers[qIndex] === option}
                  onChange={() => onAnswerChange(qIndex, option)}
                  className="form-radio h-5 w-5 text-purple-600 focus:ring-purple-500 mr-3"
                  disabled={showQuizResults}
                />
                <span className="flex-1">{option}</span>
              </label>
            ))}
          </div>
          {showQuizResults && (
            <div className="mt-4 text-lg">
              {currentQuizAnswers[qIndex] === q.correctAnswer ? (
                <p className="text-green-700 font-semibold flex items-center">
                  <Check className="w-5 h-5 mr-2" />
                  Correct!
                </p>
              ) : (
                <p className="text-red-700 font-semibold flex items-center">
                  <X className="w-5 h-5 mr-2" />
                  Incorrect. The correct answer was: <span className="font-bold ml-1">{q.correctAnswer}</span>
                </p>
              )}
            </div>
          )}
        </div>
      ))}
      
      {!showQuizResults && (
        <button
          onClick={onCheckAnswers}
          className="mt-6 w-full sm:w-auto px-8 py-3 bg-emerald-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Check My Answers
        </button>
      )}
    </section>
  );
};

export default QuizDisplay;