import React from 'react';
import { ScrollText } from 'lucide-react';

interface SummaryDisplayProps {
  summary: string;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summary }) => {
  if (!summary) return null;

  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <ScrollText className="w-6 h-6 text-purple-700" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">Summary</h2>
      </div>
      <div className="bg-purple-50 p-6 rounded-lg shadow-inner border border-purple-200 text-lg leading-relaxed text-gray-800">
        <p>{summary}</p>
      </div>
    </section>
  );
};

export default SummaryDisplay;