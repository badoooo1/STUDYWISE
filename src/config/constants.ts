export const POMODORO_DURATIONS = {
  work: 25 * 60, // 25 minutes
  shortBreak: 5 * 60, // 5 minutes
  longBreak: 15 * 60, // 15 minutes
} as const;

export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export const NOTIFICATION_SOUND_URL = 'https://www.soundjay.com/buttons/beep-01a.mp3';