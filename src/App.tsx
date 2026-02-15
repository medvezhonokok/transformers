import { useState } from 'react';
import Navigation from './components/Navigation';
import History from './pages/History';
import Team from './pages/Team';
import Schedule from './pages/Schedule';
import { ThemeProvider } from './context/ThemeContext';
import Contacts from "./pages/Contacts";

function App() {
  const [currentPage, setCurrentPage] = useState<'history' | 'team' | 'schedule' | 'contacts'>('history')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <ThemeProvider>
        <div className="app">
          <Navigation
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
          />

          <div
              className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
          />

          <main className="main-content">
            {currentPage === 'history' && <History />}
            {currentPage === 'team' && <Team />}
            {currentPage === 'schedule' && <Schedule />}
            {currentPage === 'contacts' && <Contacts />}
          </main>
        </div>
      </ThemeProvider>
  )
}

export default App