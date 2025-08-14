import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-purple-100 rounded-lg shadow-md mb-8">
      <svg className="animate-spin h-6 w-6 mr-3 text-purple-600" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="text-purple-700 text-lg">AI is working its magic...</span>
    </div>
  );
};

export default LoadingSpinner;