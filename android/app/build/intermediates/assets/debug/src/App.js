// FlowSense AI - Main Application Component

function MainContent() {
  const { currentView } = React.useContext(window.CrowdContext);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = React.useState(false);
  const [isGeminiAssistantOpen, setIsGeminiAssistantOpen] = React.useState(false);

  // Initialize Lucide icons on view changes & set up custom event listeners
  React.useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }

    const handleOpenKeyModal = () => setIsApiKeyModalOpen(true);
    const handleOpenAssistantModal = () => setIsGeminiAssistantOpen(true);

    window.addEventListener('open-api-key-modal', handleOpenKeyModal);
    window.addEventListener('open-gemini-assistant', handleOpenAssistantModal);

    return () => {
      window.removeEventListener('open-api-key-modal', handleOpenKeyModal);
      window.removeEventListener('open-gemini-assistant', handleOpenAssistantModal);
    };
  });

  return (
    <div className="min-h-screen flex flex-col justify-between relative pb-16 md:pb-0">
      <div>
        <window.Navbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8 pb-24 md:pb-8">
          {currentView === 'landing' && <window.LandingView />}
          {currentView === 'citizen' && <window.CitizenView />}
          {currentView === 'admin' && <window.AdminDashboard />}
          {currentView === 'kiosk' && <window.KioskScanner />}
        </main>
      </div>

      {/* Mobile Glassmorphic Bottom Navigation Bar */}
      <window.MobileBottomNav />

      {/* Global AI Modals */}
      <window.ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)} 
      />

      <window.GeminiAssistantModal 
        isOpen={isGeminiAssistantOpen} 
        onClose={() => setIsGeminiAssistantOpen(false)} 
      />

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-xs text-slate-500 mt-12 mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-300">FlowSense AI</span>
            <span>— Smart Crowd Management & Virtual Queuing System for India</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>Google Gemini AI Engine</span>
            <span>•</span>
            <span>Safety Threshold AI</span>
            <span>•</span>
            <span>Made for Public Spaces in India</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <window.CrowdProvider>
      <MainContent />
    </window.CrowdProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
