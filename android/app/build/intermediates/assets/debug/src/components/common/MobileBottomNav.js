// FlowSense AI - Mobile Bottom Navigation Bar (App Navigation for Smartphones)

function MobileBottomNav() {
  const { 
    currentView, 
    setCurrentView,
    activeTicket,
    alerts
  } = React.useContext(window.CrowdContext);

  const criticalAlertsCount = alerts.filter(a => !a.isResolved && a.severity === 'critical').length;

  const handleTabClick = (viewName) => {
    if (window.HapticsService) {
      window.HapticsService.lightTap();
    }
    setCurrentView(viewName);
  };

  const handleOpenGemini = () => {
    if (window.HapticsService) {
      window.HapticsService.mediumTap();
    }
    window.dispatchEvent(new CustomEvent('open-gemini-assistant'));
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-auto">
      <nav className="glass-card bg-slate-900/95 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl shadow-slate-950 flex items-center justify-around py-2 px-1">
        
        {/* Home Tab */}
        <button
          onClick={() => handleTabClick('landing')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative ${
            currentView === 'landing'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <i data-lucide="home" className={`w-5 h-5 ${currentView === 'landing' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
          <span className="text-[10px] font-medium tracking-tight">Home</span>
          {currentView === 'landing' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

        {/* Citizen Queue Pass Tab */}
        <button
          onClick={() => handleTabClick('citizen')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative ${
            currentView === 'citizen'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <i data-lucide="users" className={`w-5 h-5 ${currentView === 'citizen' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
            {activeTicket && (
              <span className="absolute -top-1.5 -right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-saffron-500 text-[9px] font-extrabold text-slate-950 shadow-sm animate-pulse">
                •
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Citizen</span>
          {currentView === 'citizen' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

        {/* Center Prominent AI Assistant Action Button */}
        <button
          onClick={handleOpenGemini}
          className="flex flex-col items-center justify-center -mt-5 bg-gradient-to-tr from-purple-700 via-indigo-600 to-brand-500 text-white w-12 h-12 rounded-full shadow-lg shadow-purple-900/50 border-2 border-slate-900 hover:scale-110 active:scale-95 transition-all glow-blue"
          title="Ask Gemini AI Assistant"
        >
          <i data-lucide="sparkles" className="w-5 h-5 text-saffron-300 animate-pulse"></i>
        </button>

        {/* Gate Scanner Tab */}
        <button
          onClick={() => handleTabClick('kiosk')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative ${
            currentView === 'kiosk'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <i data-lucide="qr-code" className={`w-5 h-5 ${currentView === 'kiosk' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
          <span className="text-[10px] font-medium tracking-tight">Scanner</span>
          {currentView === 'kiosk' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

        {/* Admin Command Tab */}
        <button
          onClick={() => handleTabClick('admin')}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all relative ${
            currentView === 'admin'
              ? 'text-brand-400 font-bold scale-105'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <i data-lucide="shield-alert" className={`w-5 h-5 ${currentView === 'admin' ? 'stroke-[2.5]' : 'stroke-2'}`}></i>
            {criticalAlertsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-extrabold text-white shadow-sm">
                {criticalAlertsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-tight">Admin</span>
          {currentView === 'admin' && (
            <span className="absolute -bottom-1 w-1.5 h-1.5 bg-brand-500 rounded-full glow-blue"></span>
          )}
        </button>

      </nav>
    </div>
  );
}

window.MobileBottomNav = MobileBottomNav;
