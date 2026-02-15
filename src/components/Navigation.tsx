import {Moon, Sun, Menu, X} from 'lucide-react';
import {useTheme} from '../context/ThemeContext';
import {useEffect} from 'react';

interface NavigationProps {
    currentPage: 'history' | 'team' | 'schedule' | 'contacts';
    onPageChange: (page: 'history' | 'team' | 'schedule' | 'contacts') => void;
    isMenuOpen: boolean;
    setIsMenuOpen: (isOpen: boolean) => void;
}

export default function Navigation({currentPage, onPageChange, isMenuOpen, setIsMenuOpen}: NavigationProps) {
    const {theme, toggleTheme} = useTheme();

    const handlePageChange = (page: 'history' | 'team' | 'schedule' | 'contacts') => {
        onPageChange(page);
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsMenuOpen]);

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
        <nav className={`nav-container ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className="nav-content">
                <div className="logo" onClick={() => handlePageChange('team')} style={{ cursor: 'pointer' }}>
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
                        {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
                    </button>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="burger-button"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </div>

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