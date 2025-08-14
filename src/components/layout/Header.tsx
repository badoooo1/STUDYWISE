import React from 'react';
import { BookOpen } from 'lucide-react';
import DesktopNavigation from '../navigation/DesktopNavigation';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: 'welcome' | 'notes' | 'study' | 'pomodoro' | 'progress') => void;
}

const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate }) => {
  return (
    <header className="mb-10">
      {/* Top Bar with Hamburger Menu */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <DesktopNavigation currentScreen={currentScreen} onNavigate={onNavigate} />
          <div className="hidden md:block text-sm text-gray-500 font-medium">
            Menu
          </div>
        </div>
        <div className="flex-1" /> {/* Spacer */}
      </div>
    </header>
  );
};

export default Header;