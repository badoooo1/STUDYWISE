import React, { useState, useEffect } from 'react';
import { Menu, X, Home, FileText, BookOpen, Timer, TrendingUp } from 'lucide-react';

interface DesktopNavigationProps {
  currentScreen: string;
  onNavigate: (screen: 'welcome' | 'notes' | 'study' | 'pomodoro' | 'progress') => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ currentScreen, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'welcome', label: 'Home', icon: Home, description: 'Welcome to StudyWise' },
    { id: 'notes', label: 'Notes', icon: FileText, description: 'Input your study notes' },
    { id: 'study', label: 'Study', icon: BookOpen, description: 'Review summary and quiz' },
    { id: 'pomodoro', label: 'Focus Timer', icon: Timer, description: 'Pomodoro technique' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, description: 'Track your progress' },
  ];

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavigation = (screen: 'welcome' | 'notes' | 'study' | 'pomodoro' | 'progress') => {
    onNavigate(screen);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="hidden md:flex items-center justify-center w-12 h-12 rounded-lg bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg hover:bg-white hover:shadow-xl transition-all duration-200 text-purple-700 hover:text-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300"
        aria-label="Open navigation menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 hidden md:block"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 hidden md:block ${
        isMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-700" />
            <h2 className="text-xl font-bold text-purple-700">StudyWise</h2>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-300"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <div className="space-y-2">
            {navItems.map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id as any)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left group focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                  currentScreen === id
                    ? 'bg-purple-100 border-2 border-purple-300 text-purple-800 shadow-md'
                    : 'hover:bg-gray-50 border-2 border-transparent text-gray-700 hover:text-purple-700'
                }`}
              >
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                  currentScreen === id
                    ? 'bg-purple-200 text-purple-800'
                    : 'bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{label}</div>
                  <div className={`text-sm transition-colors duration-200 ${
                    currentScreen === id ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-600'
                  }`}>
                    {description}
                  </div>
                </div>
                {currentScreen === id && (
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>Your AI-Powered Study Assistant</p>
            <p className="mt-1">Stay focused, stay productive</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopNavigation;
