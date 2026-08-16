// FlowSense AI - Citizen Public Portal (Browse & Queue)

function CitizenView() {
  const { 
    locations, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
    selectedStatusFilter,
    setSelectedStatusFilter,
    setSelectedLocationId,
    activeTicket,
    leaveQueue
  } = React.useContext(window.CrowdContext);

  const [queueModalLoc, setQueueModalLoc] = React.useState(null);
  const [detailModalLocId, setDetailModalLocId] = React.useState(null);

  // Extract unique cities & categories
  const cities = ['All', ...new Set(locations.map(l => l.city))];
  const categories = ['All', 'Temples & Festivals', 'Train Stations', 'Metro Stations', 'Government Offices', 'Stadiums & Events'];
  const statusOptions = ['All', 'Low', 'Moderate', 'High', 'Critical'];

  // Filter logic
  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          loc.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          loc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || loc.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || loc.city === selectedCity;
    const matchesStatus = selectedStatusFilter === 'All' || loc.status === selectedStatusFilter;

    return matchesSearch && matchesCategory && matchesCity && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Banner & Active Ticket Banner if present */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-3">
              <span>Public Spaces & Virtual Queues</span>
              <span className="text-xs bg-brand-500/20 text-brand-300 px-2.5 py-1 rounded-full border border-brand-500/30">Live Status</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Select a location in India to check real-time crowd density, view 24-hour AI forecasts, or join a virtual queue remotely.
            </p>
          </div>
        </div>

        {/* ACTIVE TICKET BANNER CARD */}
        {activeTicket && (
          <div className="glass-card border-2 border-brand-500/60 p-5 rounded-2xl bg-gradient-to-r from-brand-950/80 via-slate-900 to-indigo-950/90 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-saffron-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Active Token</span>
                  <span className="text-xs text-brand-300 font-mono">ID: {activeTicket.id}</span>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-white">{activeTicket.locationName}</h3>
                <p className="text-xs text-slate-300 flex items-center gap-2">
                  <span>{activeTicket.counterName}</span>
                  <span>•</span>
                  <span>Party of {activeTicket.partySize}</span>
                  {activeTicket.hasAssistance && (
                    <span className="bg-purple-900/60 text-purple-200 text-[10px] px-1.5 py-0.5 rounded">Special Assistance</span>
                  )}
                </p>
              </div>

              <div className="flex items-center gap-6 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="text-center px-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Position in Line</span>
                  <span className="text-3xl font-extrabold font-heading text-saffron-400">#{activeTicket.position}</span>
                </div>
                <div className="h-8 w-px bg-slate-800"></div>
                <div className="text-center px-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Est. Wait</span>
                  <span className="text-2xl font-extrabold font-heading text-white">~{activeTicket.estimatedWaitMinutes}m</span>
                </div>
                <button
                  onClick={() => setQueueModalLoc(locations.find(l => l.id === activeTicket.locationId) || locations[0])}
                  className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-xs font-semibold shadow"
                >
                  View QR Ticket
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <i data-lucide="search" className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400"></i>
            <input
              type="text"
              placeholder="Search by venue name, city, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
            />
          </div>

          {/* City Filter */}
          <div className="w-full md:w-48">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Cities ({cities.length - 1})</option>
              {cities.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-56">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-44">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="All">All Crowd Statuses</option>
              <option value="Low">Low Density</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High Crowd</option>
              <option value="Critical">Critical Alert</option>
            </select>
          </div>

        </div>
      </div>

      {/* LOCATION CARDS GRID */}
      {filteredLocations.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
          <i data-lucide="map-pin-off" className="w-12 h-12 text-slate-500 mx-auto"></i>
          <h3 className="text-base font-bold text-white">No Public Spaces Found</h3>
          <p className="text-xs text-slate-400">Try adjusting your search filters or selecting another city.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map(loc => (
            <div 
              key={loc.id} 
              className="glass-card rounded-2xl border border-slate-800/80 hover:border-brand-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
            >
              {/* Card Image Banner */}
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={loc.image} 
                  alt={loc.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-saffron-300 border border-saffron-500/30 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {loc.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <window.StatusBadge status={loc.status} size="sm" />
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-brand-300 transition line-clamp-1">
                    {loc.name}
                  </h3>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <i data-lucide="map-pin" className="w-3 h-3 text-slate-400"></i>
                    <span>{loc.city}, {loc.state}</span>
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                
                <window.CapacityGauge current={loc.currentCount} capacity={loc.capacity} safetyThreshold={loc.safetyThreshold} />

                {/* Info row */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Est. Wait Time</span>
                    <span className="text-sm font-bold font-heading text-white">{loc.avgWaitMinutes} mins</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Active Counters</span>
                    <span className="text-sm font-bold font-heading text-brand-300">{loc.counters.length} Active Lines</span>
                  </div>
                </div>

                {/* Best arrival window suggestion */}
                <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-xl text-[11px] text-emerald-300 flex items-center gap-2">
                  <i data-lucide="sparkles" className="w-4 h-4 text-emerald-400 shrink-0"></i>
                  <span className="truncate">AI Best Time: <strong>{loc.bestTimeWindow}</strong></span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => setDetailModalLocId(loc.id)}
                    className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <i data-lucide="line-chart" className="w-3.5 h-3.5 text-brand-400"></i>
                    <span>AI Forecast</span>
                  </button>

                  <button
                    onClick={() => setQueueModalLoc(loc)}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl text-xs font-semibold shadow flex items-center justify-center gap-1.5 transition"
                  >
                    <i data-lucide="ticket" className="w-3.5 h-3.5"></i>
                    <span>Join Queue</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailModalLocId && (
        <window.LocationDetailModal 
          locationId={detailModalLocId}
          onClose={() => setDetailModalLocId(null)}
          onJoinQueue={(loc) => { setDetailModalLocId(null); setQueueModalLoc(loc); }}
        />
      )}

      {/* VIRTUAL QUEUE MODAL */}
      {queueModalLoc && (
        <window.VirtualQueueModal
          location={queueModalLoc}
          onClose={() => setQueueModalLoc(null)}
        />
      )}

    </div>
  );
}

window.CitizenView = CitizenView;
