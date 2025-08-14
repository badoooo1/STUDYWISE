import React from 'react';
import { Home, FileText, BookOpen, Timer, TrendingUp } from 'lucide-react';

interface ScreenNavigationProps {
  currentScreen: string;
  onNavigate: (screen: 'welcome' | 'notes' | 'study' | 'pomodoro' | 'progress') => void;
}

const ScreenNavigation: React.FC<ScreenNavigationProps> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: 'welcome', label: 'Home', icon: Home },
    { id: 'notes', label: 'Notes', icon: FileText },
    { id: 'study', label: 'Study', icon: BookOpen },
    { id: 'pomodoro', label: 'Focus', icon: Timer },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id as any)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition duration-200 ${
              currentScreen === id
                ? 'text-purple-600 bg-purple-50'
                : 'text-gray-500 hover:text-purple-600'
            }`}
          >
            <Icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ScreenNavigation;