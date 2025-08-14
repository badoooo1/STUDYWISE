import React from 'react';
import { TrendingUp, Clock, User } from 'lucide-react';
import type { StudySession } from '../../types';

interface ProgressTrackerProps {
  userId: string | null;
  isAuthReady: boolean;
  studySessions: StudySession[];
  totalStudyMinutes: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  userId,
  isAuthReady,
  studySessions,
  totalStudyMinutes
}) => {
  return (
    <section className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-purple-700" />
        <h2 className="text-2xl sm:text-3xl font-semibold text-purple-700">Study Progress</h2>
      </div>
      
      {userId && isAuthReady ? (
        <>
          <div className="flex items-center gap-2 text-lg text-gray-700 mb-2">
            <User className="w-4 h-4" />
            <span className="font-bold">User ID:</span> 
            <span className="text-sm">{userId}</span>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <p className="text-xl font-bold text-purple-800">
                Total Study Time: {totalStudyMinutes.toFixed(1)} minutes
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-purple-700">Recent Sessions:</h3>
          {studySessions.length > 0 ? (
            <ul className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {studySessions.map((session) => (
                <li key={session.id} className="bg-white p-3 border border-purple-100 rounded-lg shadow-sm text-sm">
                  <p className="font-semibold text-gray-800">{session.subject || 'No Subject'}</p>
                  <p className="text-gray-600">Type: {session.type}</p>
                  <p className="text-gray-600">Duration: {session.durationMinutes} mins</p>
                  <p className="text-gray-600">
                    Date: {session.timestamp ? new Date(session.timestamp.toDate()).toLocaleString() : 'Loading...'}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No study sessions logged yet. Start a Pomodoro timer!</p>
          )}
        </>
      ) : (
        <p className="text-gray-600">Loading user data or Firebase is not configured. Progress tracking will appear here.</p>
      )}
    </section>
  );
};

export default ProgressTracker;