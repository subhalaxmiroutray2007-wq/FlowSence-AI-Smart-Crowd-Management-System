// FlowSense AI - Top Navigation Bar

function Navbar() {
  const { 
    currentView, 
    setCurrentView, 
    simulationRunning, 
    setSimulationRunning,
    soundEnabled,
    setSoundEnabled,
    activeTicket,
    alerts
  } = React.useContext(window.CrowdContext);

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);

  React.useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallPWA = async () => {
    if (window.HapticsService) window.HapticsService.mediumTap();
    if (!deferredPrompt) {
      alert('To install FlowSense AI on your mobile device: tap your browser menu (⋮ or Share icon) and select "Add to Home Screen" or "Install App".');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const criticalAlertsCount = alerts.filter(a => !a.isResolved && a.severity === 'critical').length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
      {/* Top Announcement Bar if critical alert exists */}
      {criticalAlertsCount > 0 && (
        <div className="bg-rose-600/90 text-white text-xs px-4 py-1.5 flex items-center justify-between font-medium animate-pulse">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <span className="bg-rose-900/60 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Critical Safety Alert</span>
            <span className="truncate">{alerts.find(a => !a.isResolved && a.severity === 'critical')?.message}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-700 text-white shadow-lg glow-blue">
              <i data-lucide="radar" className="w-5 h-5 animate-spin-slow"></i>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">FlowSense</span>
                <span className="font-heading font-extrabold text-xl text-brand-400">AI</span>
                <span className="hidden sm:inline-block bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded font-mono border border-slate-700">IN v2.4</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Smart Crowd Safety & Queue Systems</p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'landing' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <i data-lucide="home" className="w-4 h-4"></i>
              <span>Home Gateway</span>
            </button>

            <button
              onClick={() => setCurrentView('citizen')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'citizen' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <i data-lucide="users" className="w-4 h-4"></i>
              <span>Citizen App & Queue</span>
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'admin' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <i data-lucide="shield-alert" className="w-4 h-4"></i>
              <span>Admin Command Center</span>
              {criticalAlertsCount > 0 && (
                <span className="bg-rose-500 text-white px-1.5 py-0.5 rounded-full text-[10px] font-bold">
                  {criticalAlertsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('kiosk')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'kiosk' 
                  ? 'bg-brand-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <i data-lucide="qr-code" className="w-4 h-4"></i>
              <span>Gate Scanner</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Install Mobile PWA Button */}
            <button
              onClick={handleInstallPWA}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-brand-500/40 text-brand-300 text-xs font-semibold shadow-sm transition-all"
              title="Install Mobile App on Phone"
            >
              <i data-lucide="smartphone" className="w-3.5 h-3.5 text-brand-400"></i>
              <span className="hidden sm:inline">Install App</span>
            </button>

            {/* Ask Gemini AI Assistant Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-gemini-assistant'))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/40 text-purple-200 hover:border-purple-400 text-xs font-semibold shadow-sm transition-all"
              title="Open Gemini AI Crowd Assistant"
            >
              <i data-lucide="sparkles" className="w-3.5 h-3.5 text-saffron-400 animate-pulse"></i>
              <span className="hidden sm:inline">Ask Gemini AI</span>
            </button>

            {/* API Key Connection Status & Modal Trigger */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-api-key-modal'))}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                window.GeminiService && window.GeminiService.hasValidKey()
                  ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/80'
                  : 'bg-amber-950/70 border-amber-500/50 text-amber-300 hover:bg-amber-900/80'
              }`}
              title="Configure Google Gemini API Key"
            >
              <i data-lucide="key" className="w-3.5 h-3.5"></i>
              <span className="hidden sm:inline">
                {window.GeminiService && window.GeminiService.hasValidKey() ? 'Gemini Connected' : 'Connect API Key'}
              </span>
            </button>

            {/* Active Ticket Banner Pill */}
            {activeTicket && (
              <button
                onClick={() => setCurrentView('citizen')}
                className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-indigo-900/80 to-brand-900/80 border border-brand-500/40 text-brand-200 px-3 py-1.5 rounded-full text-xs font-medium animate-pulse hover:border-brand-400"
              >
                <i data-lucide="ticket" className="w-3.5 h-3.5 text-saffron-400"></i>
                <span>Queue Token #{activeTicket.tokenNo}</span>
                <span className="bg-brand-500 text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">Pos #{activeTicket.position}</span>
              </button>
            )}

            {/* Live Simulation Engine Toggle */}
            <button
              onClick={() => setSimulationRunning(!simulationRunning)}
              title={simulationRunning ? 'Pause live crowd simulation' : 'Resume live crowd simulation'}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                simulationRunning
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400'
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${simulationRunning ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`}></span>
              <span className="hidden sm:inline">{simulationRunning ? 'LIVE Data Engine' : 'Simulation Paused'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute queue audio alerts' : 'Enable queue audio alerts'}
              className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/80 text-slate-300 hover:text-white transition"
            >
              <i data-lucide={soundEnabled ? 'volume-2' : 'volume-x'} className="w-4 h-4"></i>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              <i data-lucide={mobileMenuOpen ? 'x' : 'menu'} className="w-5 h-5"></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          <button
            onClick={() => { setCurrentView('landing'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
              currentView === 'landing' ? 'bg-brand-600 text-white' : 'text-slate-300 bg-slate-800/50'
            }`}
          >
            <i data-lucide="home" className="w-4 h-4"></i>
            <span>Home Gateway</span>
          </button>
          <button
            onClick={() => { setCurrentView('citizen'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
              currentView === 'citizen' ? 'bg-brand-600 text-white' : 'text-slate-300 bg-slate-800/50'
            }`}
          >
            <i data-lucide="users" className="w-4 h-4"></i>
            <span>Citizen App & Queue</span>
          </button>
          <button
            onClick={() => { setCurrentView('admin'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
              currentView === 'admin' ? 'bg-brand-600 text-white' : 'text-slate-300 bg-slate-800/50'
            }`}
          >
            <i data-lucide="shield-alert" className="w-4 h-4"></i>
            <span>Admin Command Center</span>
          </button>
          <button
            onClick={() => { setCurrentView('kiosk'); setMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium ${
              currentView === 'kiosk' ? 'bg-brand-600 text-white' : 'text-slate-300 bg-slate-800/50'
            }`}
          >
            <i data-lucide="qr-code" className="w-4 h-4"></i>
            <span>Gate Scanner</span>
          </button>
        </div>
      )}
    </header>
  );
}

window.Navbar = Navbar;
