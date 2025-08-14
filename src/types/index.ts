export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface AppState {
  notes: string;
  summary: string;
  quiz: QuizQuestion[];
  currentQuizAnswers: Record<number, string>;
  showQuizResults: boolean;
  loading: boolean;
  error: string;
  currentScreen: 'welcome' | 'notes' | 'study' | 'pomodoro' | 'progress';
  studySessionActive: boolean;
}

export interface StudySession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  subject?: string;
  notes?: string;
  type: 'pomodoro' | 'study';
}

export interface PomodoroState {
  isRunning: boolean;
  isPaused: boolean;
  timeLeft: number;
  currentPhase: 'work' | 'shortBreak' | 'longBreak';
  currentSubject: string;
  completedSessions: number;
  totalWorkTime: number;
}
