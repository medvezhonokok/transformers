import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  currentPage: 'history' | 'team' | 'schedule';
  onPageChange: (page: 'history' | 'team' | 'schedule') => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="logo">
          <span className="logo-text">ТРАНСФОРМЕРЫ</span>
        </div>

        <div className="nav-menu">
          <button
            onClick={() => onPageChange('history')}
            className={`nav-link ${currentPage === 'history' ? 'active' : ''}`}
          >
            История
          </button>
          <button
            onClick={() => onPageChange('team')}
            className={`nav-link ${currentPage === 'team' ? 'active' : ''}`}
          >
            Команда
          </button>
          <button
            onClick={() => onPageChange('schedule')}
            className={`nav-link ${currentPage === 'schedule' ? 'active' : ''}`}
          >
            Расписание
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
}