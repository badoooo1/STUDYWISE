import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { POMODORO_DURATIONS, NOTIFICATION_SOUND_URL } from '../config/constants';
import type { PomodoroState } from '../types';

declare global {
  const __app_id: string;
}

export const usePomodoro = (db: any, userId: string | null, isAuthReady: boolean) => {
  const [state, setState] = useState<PomodoroState>({
    mode: 'work',
    timeLeft: POMODORO_DURATIONS.work,
    isActive: false,
    sessionsCompleted: 0,
    currentSubject: ''
  });

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.isActive && state.timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (state.timeLeft === 0 && state.isActive) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      setState(prev => ({ ...prev, isActive: false }));
      playNotificationSound();
      handlePomodoroCompletion();
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [state.isActive, state.timeLeft]);

  const playNotificationSound = () => {
    const audio = new Audio(NOTIFICATION_SOUND_URL);
    audio.play().catch(e => console.error("Error playing sound:", e));
  };

  const handlePomodoroCompletion = async () => {
    if (state.mode === 'work') {
      const completedSessions = state.sessionsCompleted + 1;
      
      // Save work session to Firestore
      if (db && userId && isAuthReady && state.currentSubject.trim()) {
        try {
          await addDoc(collection(db, `artifacts/${__app_id}/users/${userId}/pomodoro_sessions`), {
            type: 'work',
            durationMinutes: POMODORO_DURATIONS.work / 60,
            subject: state.currentSubject,
            timestamp: serverTimestamp(),
            distractionEvents: 0
          });
        } catch (e) {
          console.error("Error adding work session document: ", e);
        }
      }

      // Determine next mode
      const nextMode = completedSessions % 4 === 0 ? 'long-break' : 'short-break';
      const nextDuration = nextMode === 'long-break' ? POMODORO_DURATIONS.longBreak : POMODORO_DURATIONS.shortBreak;

      setState(prev => ({
        ...prev,
        mode: nextMode,
        timeLeft: nextDuration,
        sessionsCompleted: completedSessions
      }));
    } else {
      // Break ended, back to work
      setState(prev => ({
        ...prev,
        mode: 'work',
        timeLeft: POMODORO_DURATIONS.work
      }));
    }
  };

  const startTimer = () => {
    setState(prev => ({ ...prev, isActive: true }));
  };

  const pauseTimer = () => {
    setState(prev => ({ ...prev, isActive: false }));
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const resetTimer = () => {
    setState({
      mode: 'work',
      timeLeft: POMODORO_DURATIONS.work,
      isActive: false,
      sessionsCompleted: 0,
      currentSubject: ''
    });
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const setCurrentSubject = (subject: string) => {
    setState(prev => ({ ...prev, currentSubject: subject }));
  };

  return {
    state,
    startTimer,
    pauseTimer,
    resetTimer,
    setCurrentSubject
  };
};