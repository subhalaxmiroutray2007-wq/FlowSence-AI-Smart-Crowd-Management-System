// FlowSense AI - Mobile Bottom Navigation Bar (App Navigation for Smartphones)

function MobileBottomNav() {
  const { 
    currentView, 
    setCurrentView,
    navigateTo,
    currentUser,
    activeTicket,
    alerts
  } = React.useContext(window.CrowdContext);

  const criticalAlertsCount = alerts.filter(a => !a.isResolved && a.severity === 'critical').length;

  const handleTabClick = (viewName) => {
    if (window.HapticsService) {
      window.HapticsService.lightTap();
    }
    if (navigateTo) navigateTo(viewName);
    else setCurrentView(viewName);
  };

  const handleOpenGemini = () => {
    if (window.HapticsService) {
      window.HapticsService.mediumTap();
    }
    window.dispatchEvent(new CustomEvent('open-gemini-assistant'));
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-2 pb-2 pt-1 pointer-events-auto">
      <nav className="glass-card bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-slate-950 flex items-center justify-around py-2 px-1">
        
        {/* Home Tab */}
        <button
          onClick={() => handleTabClick('landing')}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all relative ${
            currentView === 'landing'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <i data-lucide="home" className={`w-4 h-4 ${currentView === 'landing' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
          <span className="text-[9px] font-medium tracking-tight">Home</span>
          {currentView === 'landing' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

        {/* Citizen Queue Pass Tab */}
        <button
          onClick={() => handleTabClick('citizen')}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all relative ${
            currentView === 'citizen'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <i data-lucide="users" className={`w-4 h-4 ${currentView === 'citizen' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
            {activeTicket && (
              <span className="absolute -top-1.5 -right-2 flex h-3 w-3 items-center justify-center rounded-full bg-saffron-500 text-[8px] font-extrabold text-slate-950 shadow-sm animate-pulse">
                •
              </span>
            )}
          </div>
          <span className="text-[9px] font-medium tracking-tight">Citizen</span>
          {currentView === 'citizen' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

        {/* Center Prominent AI Assistant Action Button */}
        <button
          onClick={handleOpenGemini}
          className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-purple-700 via-indigo-600 to-brand-500 text-white w-11 h-11 rounded-full shadow-lg shadow-purple-900/50 border-2 border-slate-900 hover:scale-110 active:scale-95 transition-all glow-blue"
          title="Ask Gemini AI Assistant"
        >
          <i data-lucide="sparkles" className="w-4 h-4 text-saffron-300 animate-pulse"></i>
        </button>

        {/* Gate Scanner Tab */}
        <button
          onClick={() => handleTabClick('kiosk')}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all relative ${
            currentView === 'kiosk'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <i data-lucide="qr-code" className={`w-4 h-4 ${currentView === 'kiosk' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
          <span className="text-[9px] font-medium tracking-tight">Scanner</span>
          {currentView === 'kiosk' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

        {/* Login / Profile Tab */}
        <button
          onClick={() => handleTabClick('login')}
          className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all relative ${
            currentView === 'login'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <i data-lucide={currentUser ? 'user-check' : 'lock'} className={`w-4 h-4 ${currentView === 'login' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
            {currentUser && (
              <span className="absolute -top-1 -right-1.5 h-2 w-2 rounded-full bg-emerald-400"></span>
            )}
          </div>
          <span className="text-[9px] font-medium tracking-tight">{currentUser ? 'Profile' : 'Login'}</span>
          {currentView === 'login' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

      </nav>
    </div>
  );
}

window.MobileBottomNav = MobileBottomNav;
