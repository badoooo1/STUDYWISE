import { useState, useEffect } from 'react';
import type { StudySession } from '../types';

export const useStudySessions = () => {
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [error, setError] = useState('');

  // Load sessions from localStorage on mount
  useEffect(() => {
    try {
      const savedSessions = localStorage.getItem('studywise_sessions');
      if (savedSessions) {
        const parsedSessions = JSON.parse(savedSessions);
        // Convert timestamp strings back to Date objects
        const sessionsWithDates = parsedSessions.map((session: any) => ({
          ...session,
          timestamp: session.timestamp ? new Date(session.timestamp) : new Date()
        }));
        setStudySessions(sessionsWithDates);
      }
    } catch (err) {
      console.error("Error loading sessions from localStorage:", err);
      setError("Failed to load study session history.");
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('studywise_sessions', JSON.stringify(studySessions));
    } catch (err) {
      console.error("Error saving sessions to localStorage:", err);
    }
  }, [studySessions]);

  const addStudySession = (session: Omit<StudySession, 'id'>) => {
    const newSession: StudySession = {
      ...session,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setStudySessions(prev => [newSession, ...prev]);
  };

  const totalStudyMinutes = studySessions
    .filter(s => s.type === 'work')
    .reduce((acc, session) => acc + (session.durationMinutes || 0), 0);

  return {
    studySessions,
    totalStudyMinutes,
    error,
    addStudySession
  };
};