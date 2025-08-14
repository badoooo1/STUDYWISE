import React, { useState } from 'react';

// Hooks
import { usePomodoro } from './hooks/usePomodoro';
import { useStudySessions } from './hooks/useStudySessions';

// Backend handles all AI services

// Components
import WelcomeScreen from './components/screens/WelcomeScreen';
import NotesScreen from './components/screens/NotesScreen';
import StudyScreen from './components/screens/StudyScreen';
import PomodoroScreen from './components/screens/PomodoroScreen';
import ProgressScreen from './components/screens/ProgressScreen';
import ScreenNavigation from './components/navigation/ScreenNavigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Types
import type { QuizQuestion, AppState } from './types/index';

const App: React.FC = () => {
  // Pomodoro state
  const pomodoro = usePomodoro();
  
  // Study sessions state
  const { studySessions, totalStudyMinutes } = useStudySessions();
  
  // App state
  const [appState, setAppState] = useState<AppState>({
    notes: '',
    summary: '',
    quiz: [],
    currentQuizAnswers: {},
    showQuizResults: false,
    loading: false,
    error: '',
    currentScreen: 'welcome',
    studySessionActive: false
  });

  // Focus monitoring (simulated)
  const [isFocused] = useState(true);
  const [noiseLevel] = useState('Normal');

  // Backend handles Gemini API calls

  // Screen navigation handlers
  const navigateToScreen = (screen: 'welcome' | 'notes' | 'study' | 'pomodoro' | 'progress') => {
    setAppState((prev: AppState) => ({ ...prev, currentScreen: screen }));
  };

  const handleStartStudying = () => {
    navigateToScreen('notes');
  };

  const handleViewProgress = () => {
    navigateToScreen('progress');
  };

  const handleBackToWelcome = () => {
    navigateToScreen('welcome');
  };

  const handleBackToNotes = () => {
    navigateToScreen('notes');
  };

  const handleBackToStudy = () => {
    navigateToScreen('study');
  };

  const handleStartPomodoro = () => {
    setAppState((prev: AppState) => ({ ...prev, studySessionActive: true }));
    navigateToScreen('pomodoro');
  };

  const handleStartNewSession = () => {
    setAppState((prev: AppState) => ({
      ...prev,
      notes: '',
      summary: '',
      quiz: [],
      currentQuizAnswers: {},
      showQuizResults: false,
      error: '',
      studySessionActive: false
    }));
    navigateToScreen('notes');
  };
  const handleNotesChange = (notes: string) => {
    setAppState((prev: AppState) => ({
      ...prev,
      notes,
      summary: '',
      quiz: [],
      currentQuizAnswers: {},
      showQuizResults: false,
      error: ''
    }));
  };

  const handleAnswerChange = (questionIndex: number, selectedOption: string) => {
    setAppState((prev: AppState) => ({
      ...prev,
      currentQuizAnswers: {
        ...prev.currentQuizAnswers,
        [questionIndex]: selectedOption
      }
    }));
  };

  const checkAnswers = () => {
    setAppState((prev: AppState) => ({ ...prev, showQuizResults: true }));
  };

  const generateContent = async () => {
    if (!appState.notes.trim()) {
      setAppState((prev: AppState) => ({ 
        ...prev, 
        error: 'Please enter some notes to summarize and generate a quiz.' 
      }));
      return;
    }

    setAppState((prev: AppState) => ({
      ...prev,
      loading: true,
      error: '',
      summary: '',
      quiz: [],
      currentQuizAnswers: {},
      showQuizResults: false
    }));

    try {
      // Create a text file from the notes and send it to the backend
      const textBlob = new Blob([appState.notes], { type: 'text/plain' });
      const file = new File([textBlob], 'notes.txt', { type: 'text/plain' });
      
      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch('http://localhost:3001/upload-and-analyze', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setAppState((prev: AppState) => ({
          ...prev,
          summary: result.summary,
          quiz: result.quiz,
          loading: false,
          currentScreen: 'study'
        }));
      } else {
        throw new Error(result.error || 'Failed to process notes');
      }
    } catch (err: any) {
      console.error('Content generation failed:', err);
      setAppState((prev: AppState) => ({
        ...prev,
        error: `Failed to process notes: ${err.message}. Please make sure the backend server is running on port 3001.`,
        loading: false
      }));
    }
  };

  // Render current screen
  const renderCurrentScreen = () => {
    const combinedError = appState.error;

    switch (appState.currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onStartStudying={handleStartStudying}
            onViewProgress={handleViewProgress}
          />
        );

      case 'notes':
        return (
          <NotesScreen
            notes={appState.notes}
            loading={appState.loading}
            error={combinedError}
            onNotesChange={handleNotesChange}
            onGenerateContent={generateContent}
            onBack={handleBackToWelcome}
          />
        );

      case 'study':
        return (
          <StudyScreen
            summary={appState.summary}
            quiz={appState.quiz}
            currentQuizAnswers={appState.currentQuizAnswers}
            showQuizResults={appState.showQuizResults}
            onAnswerChange={handleAnswerChange}
            onCheckAnswers={checkAnswers}
            onStartPomodoro={handleStartPomodoro}
            onBack={handleBackToNotes}
          />
        );

      case 'pomodoro':
        return (
          <PomodoroScreen
            pomodoroState={pomodoro.state}
            isFocused={isFocused}
            noiseLevel={noiseLevel}
            onStart={pomodoro.startTimer}
            onPause={pomodoro.pauseTimer}
            onReset={pomodoro.resetTimer}
            onSubjectChange={pomodoro.setCurrentSubject}
            onViewProgress={handleViewProgress}
            onBack={handleBackToStudy}
          />
        );

      case 'progress':
        return (
          <ProgressScreen
            studySessions={studySessions}
            totalStudyMinutes={totalStudyMinutes}
            onBack={handleBackToWelcome}
            onStartNewSession={handleStartNewSession}
          />
        );

      default:
        return (
          <WelcomeScreen
            onStartStudying={handleStartStudying}
            onViewProgress={handleViewProgress}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4 sm:p-6 lg:p-8 font-sans text-gray-800 pb-20 md:pb-8">

      <Header currentScreen={appState.currentScreen} onNavigate={navigateToScreen} />
      
      <main className="max-w-7xl mx-auto">
        {renderCurrentScreen()}
      </main>

      <ScreenNavigation
        currentScreen={appState.currentScreen}
        onNavigate={navigateToScreen}
      />

      <Footer />
    </div>
  );
};

export default App;