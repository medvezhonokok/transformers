import { useState } from 'react';
import Navigation from './components/Navigation';
import History from './pages/History';
import Team from './pages/Team';
import Schedule from './pages/Schedule';
import { ThemeProvider } from './context/ThemeContext';
import Contacts from "./pages/Contacts";

function App() {
  const [currentPage, setCurrentPage] = useState<'history' | 'team' | 'schedule' | 'contacts'>('history');

  const renderPage = () => {
    switch (currentPage) {
      case 'history':
        return <History />;
      case 'team':
        return <Team />;
      case 'schedule':
        return <Schedule />;
      case 'contacts':
        return <Contacts />;
      default:
        return <History />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="main-content">
          {renderPage()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
