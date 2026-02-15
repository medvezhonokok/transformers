import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState, useEffect } from 'react';

interface NavigationProps {
  currentPage: 'history' | 'team' | 'schedule' | 'contacts';
  onPageChange: (page: 'history' | 'team' | 'schedule' | 'contacts') => void;
}

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handlePageChange = (page: 'history' | 'team' | 'schedule' | 'contacts') => {
    onPageChange(page);
    setIsMenuOpen(false);
  };

  // Управление скроллом
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Показываем меню при скролле вверх или в самом верху страницы
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      }
      // Скрываем при скролле вниз (если не в самом верху и не открыто мобильное меню)
      else if (currentScrollY > lastScrollY && currentScrollY > 100 && !isMenuOpen) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
      <nav className={`nav-container ${isVisible ? 'nav-visible' : 'nav-hidden'}`}>
        <div className="nav-content">
          <div className="logo">
            <span className="logo-text">ТРАНСФОРМЕРЫ</span>
          </div>

          <div className="nav-menu desktop-menu">
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
            <button
                onClick={() => onPageChange('contacts')}
                className={`nav-link ${currentPage === 'contacts' ? 'active' : ''}`}
            >
              Контакты
            </button>
          </div>

          <div className="nav-actions">
            <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="burger-button"
                aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div
            className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
        />

        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <button
                onClick={() => handlePageChange('history')}
                className={`mobile-nav-link ${currentPage === 'history' ? 'active' : ''}`}
            >
              История
            </button>
            <button
                onClick={() => handlePageChange('team')}
                className={`mobile-nav-link ${currentPage === 'team' ? 'active' : ''}`}
            >
              Команда
            </button>
            <button
                onClick={() => handlePageChange('schedule')}
                className={`mobile-nav-link ${currentPage === 'schedule' ? 'active' : ''}`}
            >
              Расписание
            </button>
            <button
                onClick={() => handlePageChange('contacts')}
                className={`mobile-nav-link ${currentPage === 'contacts' ? 'active' : ''}`}
            >
              Контакты
            </button>
          </div>
        </div>
      </nav>
  );
}