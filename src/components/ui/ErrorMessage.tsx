import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-8 shadow-md" role="alert">
      <div className="flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        <p className="font-bold">Error:</p>
      </div>
      <p className="mt-1">{error}</p>
    </div>
  );
};

export default ErrorMessage;