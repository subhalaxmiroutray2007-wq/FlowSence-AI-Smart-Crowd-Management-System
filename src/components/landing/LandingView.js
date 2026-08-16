// FlowSense AI - Public Landing Page Gateway

function LandingView() {
  const { locations, setCurrentView, setSelectedLocationId } = React.useContext(window.CrowdContext);

  const totalHeadcount = locations.reduce((sum, loc) => sum + loc.currentCount, 0);
  const totalCapacity = locations.reduce((sum, loc) => sum + loc.capacity, 0);
  const criticalCount = locations.filter(l => l.status === 'Critical').length;
  const highCount = locations.filter(l => l.status === 'High').length;

  return (
    <div className="space-y-12 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800/80 shadow-2xl">
        
        {/* Background Decorative Grid & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold tracking-wide shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400"></span>
            </span>
            <span>NEXT-GEN CROWD SAFETY FOR PUBLIC SPACES IN INDIA</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight">
            Intelligent Crowd Safety & <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-400 via-blue-400 to-saffron-400 bg-clip-text text-transparent">
              Virtual Queue Intelligence
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            FlowSense AI monitors real-time crowd densities, predicts safety stampede risks, and provides remote virtual queue tokens for major temples, railway junctions, metro stations, and festivals across India.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentView('citizen')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-sm shadow-xl glow-blue flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <i data-lucide="users" className="w-5 h-5"></i>
              <span>Browse Spaces & Join Virtual Queue</span>
              <i data-lucide="arrow-right" className="w-4 h-4"></i>
            </button>

            <button
              onClick={() => setCurrentView('admin')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 font-semibold text-sm border border-slate-700/80 shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <i data-lucide="shield-alert" className="w-5 h-5 text-amber-400"></i>
              <span>Admin Command Dashboard</span>
            </button>
          </div>

          {/* Metric Stats Banner Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 text-left">
            <div className="p-4 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Monitored Citizens</span>
                <i data-lucide="users" className="w-4 h-4 text-brand-400"></i>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white">{totalHeadcount.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <i data-lucide="trending-up" className="w-3 h-3"></i>
                <span>Live camera sensors stream</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Monitored Locations</span>
                <i data-lucide="map-pin" className="w-4 h-4 text-saffron-400"></i>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white">{locations.length}</p>
              <p className="text-[11px] text-slate-400 mt-1">High-traffic public hubs</p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Safety Status</span>
                <i data-lucide="shield-check" className="w-4 h-4 text-emerald-400"></i>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white">98.6%</p>
              <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                <i data-lucide="alert-triangle" className="w-3 h-3"></i>
                <span>{criticalCount + highCount} spaces require throttling</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Queues Processed</span>
                <i data-lucide="ticket" className="w-4 h-4 text-indigo-400"></i>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-heading text-white">14,280+</p>
              <p className="text-[11px] text-emerald-400 mt-1">Avg wait cut by 62%</p>
            </div>
          </div>

        </div>
      </section>

      {/* LIVE HIGH DENSITY WATCHLIST TICKER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <i data-lucide="activity" className="w-5 h-5 text-brand-400"></i>
              <span>Live High-Density Watchlist (India)</span>
            </h2>
            <p className="text-xs text-slate-400">Real-time headcount feeds updated every 3 seconds</p>
          </div>
          <button 
            onClick={() => setCurrentView('citizen')}
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1"
          >
            <span>View All Spaces</span>
            <i data-lucide="chevron-right" className="w-4 h-4"></i>
          </button>
        </div>

        {/* Location Ticker Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {locations.slice(0, 3).map(loc => (
            <div 
              key={loc.id}
              onClick={() => { setSelectedLocationId(loc.id); setCurrentView('citizen'); }}
              className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-brand-500/50 transition-all cursor-pointer group space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] text-saffron-400 font-semibold uppercase tracking-wider">{loc.category}</span>
                  <h3 className="font-heading font-bold text-base text-white group-hover:text-brand-300 transition line-clamp-1">{loc.name}</h3>
                  <p className="text-xs text-slate-400">{loc.city}, {loc.state}</p>
                </div>
                <window.StatusBadge status={loc.status} size="sm" />
              </div>

              <window.CapacityGauge current={loc.currentCount} capacity={loc.capacity} safetyThreshold={loc.safetyThreshold} />

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <i data-lucide="clock" className="w-3.5 h-3.5 text-slate-400"></i>
                  <span>Est. Wait: <strong className="text-white">{loc.avgWaitMinutes} mins</strong></span>
                </div>
                <div className="flex items-center gap-1 text-brand-400 group-hover:translate-x-1 transition-transform">
                  <span className="font-medium">Details & Queue</span>
                  <i data-lucide="arrow-right" className="w-3.5 h-3.5"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE PLATFORM PILLARS */}
      <section className="space-y-6 pt-4">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold font-heading text-white">Engineered for High-Concourse Public Spaces</h2>
          <p className="text-xs text-slate-400">Combining computer vision, AI load forecasting, and mobile virtual queuing to eliminate dangerous crowd surges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <i data-lucide="eye" className="w-6 h-6"></i>
            </div>
            <h3 className="text-lg font-bold font-heading text-white">AI Vision Density Heatmaps</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Processes CCTV video feeds in real-time, detecting bottleneck zones, crowd velocity slowdowns, and localized density spikes before overcapacity occurs.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400">
              <i data-lucide="ticket" className="w-6 h-6"></i>
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Throttled Virtual Queues</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Allows pilgrims and commuters to join virtual queues remotely, receiving live audio chimes and QR gate check-in tokens when their slot arrives.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <i data-lucide="trending-up" className="w-6 h-6"></i>
            </div>
            <h3 className="text-lg font-bold font-heading text-white">48-Hour AI Predictions</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rule-based AI algorithms analyze time-of-day, day-of-week, and festival event schedules to recommend optimal, low-crowd arrival windows for visitors.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

window.LandingView = LandingView;
