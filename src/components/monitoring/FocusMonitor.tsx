import React from 'react';
import { Eye, Volume2 } from 'lucide-react';

interface FocusMonitorProps {
  isFocused: boolean;
  noiseLevel: string;
}

const FocusMonitor: React.FC<FocusMonitorProps> = ({ isFocused, noiseLevel }) => {
  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-6 h-6 text-purple-700" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">Focus & Noise Monitor</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
          <span className="text-blue-600 text-2xl mr-3">👁️</span>
          <div>
            <p className="font-semibold text-lg text-gray-800">Focus Status:</p>
            <p className={`text-xl font-bold ${isFocused ? 'text-green-600' : 'text-orange-600'}`}>
              {isFocused ? 'Focused' : 'Distracted (Simulated)'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm">
          <Volume2 className="text-blue-600 text-2xl mr-3" />
          <div>
            <p className="font-semibold text-lg text-gray-800">Environmental Noise:</p>
            <p className={`text-xl font-bold ${noiseLevel === 'Normal' ? 'text-green-600' : 'text-orange-600'}`}>
              {noiseLevel} (Simulated)
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          <span className="font-semibold">Note:</span> Real-time webcam-based head tracking and advanced microphone-based noise detection require more complex native integrations and are simulated in this web demo.
        </p>
      </div>
    </section>
  );
};

export default FocusMonitor;