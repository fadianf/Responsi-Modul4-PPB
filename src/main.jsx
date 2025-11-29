import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import SplashScreen from './components/splash/SplashScreen';
import HomePage from './pages/HomePage';
import TodosPage from './pages/TodosPage';
import TodoDetailPage from './pages/TodoDetailPage';
import JournalPage from './pages/JournalPage';
import JournalDetailPage from './pages/JournalDetailPage';
import StatisticsPage from './pages/StatisticsPage';
import ProfilePage from './pages/ProfilePage';
import BottomNav from './components/navbar/BottomNav';
import './index.css';
import PWABadge from './PWABadge';
import ToastProvider from './components/common/ToastProvider';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [mode, setMode] = useState('list'); // 'list', 'detail', 'create'
  const [selectedId, setSelectedId] = useState(null);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page, pageMode = 'list', id = null) => {
    setCurrentPage(page);
    setMode(pageMode);
    setSelectedId(id);
  };

  const handleBack = () => {
    setMode('list');
    setSelectedId(null);
  };

  const renderCurrentPage = () => {
    // Todo Detail
    if (currentPage === 'todos' && mode === 'detail' && selectedId) {
      return <TodoDetailPage todoId={selectedId} onBack={handleBack} />;
    }

    // Journal Detail
    if (currentPage === 'journal' && mode === 'detail' && selectedId) {
      return <JournalDetailPage journalId={selectedId} onBack={handleBack} />;
    }

    // Main Pages
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'todos':
        return <TodosPage onNavigate={handleNavigation} />;
      case 'journal':
        return <JournalPage onNavigate={handleNavigation} />;
      case 'statistics':
        return <StatisticsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>

      {/* Show bottom nav only in list mode */}
      {mode === 'list' && (
        <BottomNav 
          currentPage={currentPage} 
          onNavigate={(page) => handleNavigation(page, 'list')} 
        />
      )}

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <AppRoot />
    </ToastProvider>
  </StrictMode>,
);