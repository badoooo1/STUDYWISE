import React from 'react';
import { FileText } from 'lucide-react';

interface NotesInputProps {
  notes: string;
  onChange: (notes: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

const NotesInput: React.FC<NotesInputProps> = ({ notes, onChange, onGenerate, loading }) => {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-purple-700" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">Your Study Notes</h2>
      </div>
      <textarea
        className="w-full p-4 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg sm:text-base resize-y min-h-[180px] shadow-sm transition duration-200 ease-in-out"
        placeholder="Paste or type your learning materials here..."
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        rows={10}
      />
      <button
        onClick={onGenerate}
        className="mt-6 w-full sm:w-auto px-8 py-3 bg-purple-600 text-white font-bold text-lg rounded-lg shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 ease-in-out transform hover:scale-105"
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Generate Summary & Quiz'}
      </button>
    </section>
  );
};

export default NotesInput;