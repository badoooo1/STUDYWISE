import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import type { StudySession } from '../types';

declare global {
  const __app_id: string;
}

export const useStudySessions = (db: any, userId: string | null, isAuthReady: boolean) => {
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!db || !userId || !isAuthReady) return;

    const sessionsCollectionRef = collection(db, `artifacts/${__app_id}/users/${userId}/pomodoro_sessions`);
    const q = query(sessionsCollectionRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const sessionsData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as StudySession[];
      setStudySessions(sessionsData);
    }, (error) => {
      console.error("Error fetching study sessions:", error);
      setError("Failed to load study session history.");
    });

    return () => unsubscribe();
  }, [db, userId, isAuthReady]);

  const totalStudyMinutes = studySessions
    .filter(s => s.type === 'work')
    .reduce((acc, session) => acc + (session.durationMinutes || 0), 0);

  return {
    studySessions,
    totalStudyMinutes,
    error
  };
};