import React, { useState, Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import { AppView } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Lazy load components to improve initial load time (Instant Load Architecture)
const Dashboard = lazy(() => import('./components/Dashboard'));
const RelaxationTools = lazy(() => import('./components/BreathingExercise'));
const StoryMode = lazy(() => import('./components/StoryMode'));
const Roadmap = lazy(() => import('./components/Roadmap'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-[50vh] w-full">
    <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-stone-600" size={24} />
        <span className="text-xs text-stone-700 font-medium tracking-widest animate-pulse">LOADING</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.ROADMAP:
        return <Roadmap />;
      case AppView.BREATHE:
        return <RelaxationTools />;
      case AppView.STORY:
        return <StoryMode />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-stone-200 selection:bg-orange-900/30 selection:text-orange-100">
      <main className="max-w-md mx-auto min-h-screen p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Suspense fallback={<LoadingFallback />}>
                {renderView()}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;