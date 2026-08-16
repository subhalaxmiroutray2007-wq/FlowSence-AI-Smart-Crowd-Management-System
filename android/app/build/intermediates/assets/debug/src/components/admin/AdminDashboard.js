// FlowSense AI - Admin & Operator Command Center

function AdminDashboard() {
  const { locations, alerts, resolveAlert, addAlert, queues } = React.useContext(window.CrowdContext);

  const [activeTab, setActiveTab] = React.useState('ops'); // ops | cctv | analytics | venues
  const [showAddVenueModal, setShowAddVenueModal] = React.useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = React.useState(false);
  
  // Announcement form
  const [announcementMsg, setAnnouncementMsg] = React.useState('');
  const [announcementVenueId, setAnnouncementVenueId] = React.useState(locations[0]?.id || 'loc-1');
  const [announcementSeverity, setAnnouncementSeverity] = React.useState('high');

  const analyticsChartRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  const activeAlertsList = alerts.filter(a => !a.isResolved);
  const totalHeadcount = locations.reduce((sum, l) => sum + l.currentCount, 0);

  // Render Analytics Chart when tab is active
  React.useEffect(() => {
    if (activeTab !== 'analytics' || !analyticsChartRef.current) return;

    const ctx = analyticsChartRef.current.getContext('2d');
    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    const locLabels = locations.map(l => l.shortName);
    const counts = locations.map(l => l.currentCount);
    const caps = locations.map(l => l.capacity);

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: locLabels,
        datasets: [
          {
            label: 'Current Live Headcount',
            data: counts,
            backgroundColor: '#3b82f6',
            borderRadius: 8
          },
          {
            label: 'Max Venue Capacity',
            data: caps,
            backgroundColor: 'rgba(51, 65, 85, 0.5)',
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } } }
        },
        scales: {
          y: { grid: { color: 'rgba(51, 65, 85, 0.4)' }, ticks: { color: '#94a3b8' } },
          x: { grid: { color: 'transparent' }, ticks: { color: '#94a3b8' } }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, [activeTab, locations]);

  const handleBroadcastSubmit = (e) => {
    e.preventDefault();
    if (!announcementMsg.trim()) return;

    addAlert(`PUBLIC ANNOUNCEMENT: ${announcementMsg}`, announcementSeverity, announcementVenueId);
    setAnnouncementMsg('');
    setShowBroadcastModal(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-3">
            <span>Operator Command Center</span>
            <span className="text-xs bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-full border border-rose-500/30 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>LIVE Monitoring</span>
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Global crowd telemetry, emergency dispatching, camera sensor feeds, and fleet management.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBroadcastModal(true)}
            className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2"
          >
            <i data-lucide="megaphone" className="w-4 h-4"></i>
            <span>Broadcast Announcement</span>
          </button>

          <button
            onClick={() => setShowAddVenueModal(true)}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-lg flex items-center gap-2"
          >
            <i data-lucide="plus" className="w-4 h-4"></i>
            <span>Add Venue</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Aggregate Live Headcount</span>
          <p className="text-2xl font-extrabold font-heading text-white">{totalHeadcount.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-400 block">Across {locations.length} monitored venues</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Active Safety Incidents</span>
          <p className="text-2xl font-extrabold font-heading text-rose-400">{activeAlertsList.length}</p>
          <span className="text-[11px] text-rose-300 block">{activeAlertsList.filter(a => a.severity === 'critical').length} Critical level warnings</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">Active Virtual Queues</span>
          <p className="text-2xl font-extrabold font-heading text-brand-300">{queues.length} Citizens</p>
          <span className="text-[11px] text-slate-400 block">Avg wait: 18 minutes</span>
        </div>

        <div className="p-4 rounded-2xl glass-card border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 block font-medium">CCTV Sensor Stream</span>
          <p className="text-2xl font-extrabold font-heading text-emerald-400">100% Operational</p>
          <span className="text-[11px] text-slate-400 block">Neural vision online</span>
        </div>
      </div>

      {/* SUB TAB NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('ops')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'ops' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <i data-lucide="layout-dashboard" className="w-4 h-4"></i>
          <span>Global Ops Control</span>
        </button>

        <button
          onClick={() => setActiveTab('cctv')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'cctv' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <i data-lucide="video" className="w-4 h-4"></i>
          <span>AI CCTV Vision Feeds</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'analytics' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <i data-lucide="bar-chart-3" className="w-4 h-4"></i>
          <span>Analytics & AI Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('venues')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
            activeTab === 'venues' ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <i data-lucide="building-2" className="w-4 h-4"></i>
          <span>Venue Fleet Directory</span>
        </button>
      </div>

      {/* TAB 1: GLOBAL OPS CONTROL */}
      {activeTab === 'ops' && (
        <div className="space-y-6">
          
          {/* Active Incidents & Dispatch Console */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                <i data-lucide="shield-alert" className="w-5 h-5 text-rose-400"></i>
                <span>Active Safety Alerts & Field Dispatch</span>
              </h2>
              <span className="text-xs text-slate-400">{activeAlertsList.length} Active Incidents</span>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {activeAlertsList.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">No active safety incidents reported.</p>
              ) : (
                activeAlertsList.map(alert => (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      alert.severity === 'critical' 
                        ? 'bg-rose-950/40 border-rose-500/40 text-rose-200' 
                        : alert.severity === 'high'
                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold uppercase tracking-wider text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {alert.locationName}
                        </span>
                        <span className="text-[10px] text-slate-400">{alert.timeAgo}</span>
                      </div>
                      <p className="font-medium text-white">{alert.message}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => alert(`SECURITY DISPATCHED: Quick Response Team sent to ${alert.locationName}`)}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold shadow"
                      >
                        Dispatch Security
                      </button>

                      <button
                        onClick={() => resolveAlert(alert.id)}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Location Fleet Overview Table */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="font-heading font-bold text-lg text-white">Public Spaces Real-Time Status</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-3 px-4">Venue & City</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Headcount / Cap</th>
                    <th className="py-3 px-4">Occupancy</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Avg Wait</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {locations.map(loc => (
                    <tr key={loc.id} className="hover:bg-slate-900/50 transition">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <p>{loc.name}</p>
                        <span className="text-[10px] text-slate-400">{loc.city}, {loc.state}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{loc.category}</td>
                      <td className="py-3.5 px-4 font-mono">{loc.currentCount.toLocaleString()} / {loc.capacity.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <div className="w-32">
                          <window.CapacityGauge current={loc.currentCount} capacity={loc.capacity} showLabel={false} />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <window.StatusBadge status={loc.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 font-bold text-saffron-400">{loc.avgWaitMinutes} mins</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => addAlert(`GATE THROTTLE: Gate 2 entry throttled to 40 persons/min at ${loc.shortName}`, 'high', loc.id)}
                          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[11px]"
                        >
                          Throttle Gate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: AI CCTV VISION */}
      {activeTab === 'cctv' && <window.CameraFeedGrid />}

      {/* TAB 3: ANALYTICS & AI FORECASTING */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="font-heading font-bold text-lg text-white">Cross-Venue Headcount & Capacity Telemetry</h2>
            <div className="h-72 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <canvas ref={analyticsChartRef}></canvas>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: VENUES DIRECTORY */}
      {activeTab === 'venues' && (
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-white">Registered Public Facilities</h2>
            <button
              onClick={() => setShowAddVenueModal(true)}
              className="px-3.5 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold"
            >
              Add Venue
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locations.map(loc => (
              <div key={loc.id} className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{loc.name}</h3>
                    <p className="text-xs text-slate-400">{loc.city}, {loc.state}</p>
                  </div>
                  <window.StatusBadge status={loc.status} size="sm" />
                </div>
                <p className="text-xs text-slate-300 line-clamp-2">{loc.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                  <span>Safety Limit: {loc.safetyThreshold}%</span>
                  <span>Gates: {loc.openGates.length} Open</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ADD VENUE MODAL */}
      {showAddVenueModal && <window.VenueManagerModal onClose={() => setShowAddVenueModal(false)} />}

      {/* BROADCAST ANNOUNCEMENT MODAL */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-lg text-white">Broadcast Emergency Announcement</h3>
              <button onClick={() => setShowBroadcastModal(false)} className="p-1 rounded bg-slate-800 text-slate-400">
                <i data-lucide="x" className="w-5 h-5"></i>
              </button>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Target Location</label>
                <select
                  value={announcementVenueId}
                  onChange={(e) => setAnnouncementVenueId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white"
                >
                  {locations.map(l => (
                    <option key={l.id} value={l.id}>{l.name} ({l.city})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Announcement Message</label>
                <textarea
                  required
                  rows="3"
                  value={announcementMsg}
                  onChange={(e) => setAnnouncementMsg(e.target.value)}
                  placeholder="e.g. Redirecting Gate 2 visitors to Gate 4 due to overcrowding..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-semibold shadow"
                >
                  Broadcast Alert Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

window.AdminDashboard = AdminDashboard;
