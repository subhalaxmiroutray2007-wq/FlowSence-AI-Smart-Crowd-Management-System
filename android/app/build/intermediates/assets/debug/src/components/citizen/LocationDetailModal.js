// FlowSense AI - Location Detail & AI Prediction Modal

function LocationDetailModal({ locationId, onClose, onJoinQueue }) {
  const { locations, cameraFeeds } = React.useContext(window.CrowdContext);
  const location = locations.find(l => l.id === locationId);
  const chartCanvasRef = React.useRef(null);
  const chartInstanceRef = React.useRef(null);

  const [geminiAnalysis, setGeminiAnalysis] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisError, setAnalysisError] = React.useState('');

  if (!location) return null;

  // Filter camera feeds for this location
  const locFeeds = cameraFeeds.filter(f => f.locationId === location.id);
  const activeFeed = locFeeds[0] || cameraFeeds[0];

  const handleRunGeminiAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisError('');
    try {
      if (window.GeminiService && window.GeminiService.hasValidKey()) {
        const result = await window.GeminiService.analyzeCrowdLocation(location);
        setGeminiAnalysis(result);
      } else {
        // Fallback demo analysis if no key added yet
        setTimeout(() => {
          setGeminiAnalysis(`### 🚨 Live Gemini AI Analysis for ${location.name}
- **Current Safety Status**: ${location.status} (Occupancy: ${Math.round((location.currentCount/location.capacity)*100)}%)
- **Recommended Visit Window**: ${location.bestTimeWindow}
- **Immediate Action**: Maintain virtual queue throttling at Main Counters. Keep emergency exit clear.
\n*(Connect your Google Gemini API key in the navbar for live AI generated streaming insights!)*`);
          setIsAnalyzing(false);
        }, 800);
      }
    } catch (err) {
      setAnalysisError(err.message || 'Failed to call Gemini API.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Render Chart.js
  React.useEffect(() => {
    if (!chartCanvasRef.current) return;

    const { history, forecast } = window.generateCrowdTrendData(location.capacity, location.currentCount);
    
    const labels = [...history.map(h => h.time), ...forecast.map(f => f.time)];
    const histData = [...history.map(h => h.capacityPct), ...forecast.map(() => null)];
    const foreData = [...history.map(() => null), ...forecast.map(f => f.capacityPct)];
    // bridge last historical point to forecast
    foreData[history.length - 1] = history[history.length - 1].capacityPct;

    const ctx = chartCanvasRef.current.getContext('2d');
    
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Historical Capacity % (Last 24h)',
            data: histData,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.15)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointRadius: 4,
            pointBackgroundColor: '#3b82f6'
          },
          {
            label: 'AI Predicted Capacity % (Next 24h)',
            data: foreData,
            borderColor: '#f97316',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            borderDash: [5, 5],
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#f97316'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            borderColor: '#334155',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: '#cbd5e1'
          }
        },
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: { color: 'rgba(51, 65, 85, 0.4)' },
            ticks: {
              color: '#94a3b8',
              callback: (val) => val + '%'
            }
          },
          x: {
            grid: { color: 'rgba(51, 65, 85, 0.2)' },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) chartInstanceRef.current.destroy();
    };
  }, [location]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 space-y-6">
        
        {/* Header Image Banner */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white transition"
          >
            <i data-lucide="x" className="w-5 h-5"></i>
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="bg-saffron-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {location.category}
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">{location.name}</h2>
              <p className="text-xs text-slate-300">{location.address}</p>
            </div>
            <window.StatusBadge status={location.status} size="lg" />
          </div>
        </div>

        {/* Content Body */}
        <div className="px-6 pb-6 space-y-6">

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Live Headcount</span>
              <span className="text-xl font-extrabold font-heading text-white">{location.currentCount.toLocaleString()}</span>
              <span className="text-[10px] text-slate-500 block">Cap: {location.capacity.toLocaleString()}</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Occupancy Rate</span>
              <span className="text-xl font-extrabold font-heading text-brand-400">
                {Math.round((location.currentCount / location.capacity) * 100)}%
              </span>
              <span className="text-[10px] text-rose-400 block">Safety limit: {location.safetyThreshold}%</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Average Queue Wait</span>
              <span className="text-xl font-extrabold font-heading text-saffron-400">{location.avgWaitMinutes} Mins</span>
              <span className="text-[10px] text-slate-500 block">Active Token System</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block font-medium">CCTV Sensor Feeds</span>
              <span className="text-xl font-extrabold font-heading text-emerald-400">{location.activeCameras} Active</span>
              <span className="text-[10px] text-slate-500 block">AI Vision Monitored</span>
            </div>
          </div>

          {/* AI BEST TIME WINDOW HIGHLIGHT */}
          <div className="p-4 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                <i data-lucide="sparkles" className="w-6 h-6"></i>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">AI Recommendation • Recommended Visit Window</span>
                <p className="text-sm font-semibold text-white mt-0.5">{location.bestTimeWindow}</p>
                <p className="text-[11px] text-slate-300">Crowd levels forecasted to drop below 30% capacity during this timeframe.</p>
              </div>
            </div>

            <button
              onClick={handleRunGeminiAnalysis}
              disabled={isAnalyzing}
              className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-brand-600 hover:from-purple-500 hover:to-brand-500 text-white rounded-xl text-xs font-semibold shrink-0 flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              <i data-lucide="zap" className={`w-4 h-4 text-saffron-400 ${isAnalyzing ? 'animate-spin' : ''}`}></i>
              <span>{isAnalyzing ? 'Analyzing with Gemini...' : 'Run Gemini AI Live Scan'}</span>
            </button>
          </div>

          {/* GEMINI AI DETAILED REPORT CARD */}
          {(geminiAnalysis || analysisError) && (
            <div className="p-5 bg-slate-950 border border-purple-500/30 rounded-2xl space-y-3 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="font-heading font-bold text-sm text-purple-300 flex items-center gap-2">
                  <i data-lucide="brain-circuit" className="w-4 h-4 text-saffron-400"></i>
                  <span>Live Gemini AI Crowd Diagnostic Report</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Google Gemini 2.0 Engine</span>
              </div>

              {analysisError ? (
                <div className="text-xs text-rose-400 p-2 bg-rose-950/50 rounded border border-rose-800">
                  ⚠️ {analysisError}
                </div>
              ) : (
                <div className="text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-line">
                  {geminiAnalysis}
                </div>
              )}
            </div>
          )}

          {/* 24-HOUR TREND & FORECAST CHART */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <i data-lucide="line-chart" className="w-4 h-4 text-brand-400"></i>
                <span>24h Crowd History & AI 24h Predictive Model</span>
              </h3>
              <span className="text-[11px] text-slate-400">Real-time load projection</span>
            </div>

            <div className="h-64 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 relative">
              <canvas ref={chartCanvasRef}></canvas>
            </div>
          </div>

          {/* AI VISION CCTV SENSOR PREVIEW & GATES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Live Camera Stream Card */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <i data-lucide="video" className="w-4 h-4 text-rose-400"></i>
                  <span>Live AI Sensor Feed ({activeFeed ? activeFeed.name : 'Main Cam'})</span>
                </span>
                <span className="bg-rose-900/60 text-rose-200 px-2 py-0.5 rounded text-[10px] font-mono animate-pulse">
                  ● LIVE
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 h-44 group">
                <img 
                  src={activeFeed ? activeFeed.streamUrl : location.image} 
                  alt="Live feed" 
                  className="w-full h-full object-cover"
                />
                
                {/* Simulated AI Object Bounding Boxes */}
                <div className="absolute inset-0 pointer-events-none p-4">
                  <div className="border-2 border-emerald-400/80 rounded w-16 h-20 absolute top-8 left-12 animate-pulse">
                    <span className="bg-emerald-500 text-slate-950 font-bold text-[9px] px-1 absolute -top-4 left-0">PERSON #124</span>
                  </div>
                  <div className="border-2 border-emerald-400/80 rounded w-14 h-18 absolute top-10 left-32">
                    <span className="bg-emerald-500 text-slate-950 font-bold text-[9px] px-1 absolute -top-4 left-0">PERSON #125</span>
                  </div>
                  <div className="border-2 border-amber-400/80 rounded w-36 h-24 absolute bottom-6 right-8">
                    <span className="bg-amber-500 text-slate-950 font-bold text-[9px] px-1 absolute -top-4 left-0">DENSITY SURGE ZONE</span>
                  </div>
                </div>

                <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur text-[10px] text-slate-300 px-2 py-1 rounded border border-slate-800">
                  Detected Count: <strong className="text-white">{activeFeed ? activeFeed.detectedCount : 320} citizens</strong>
                </div>
              </div>
            </div>

            {/* Open Entry Gates & Counter List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                <i data-lucide="door-open" className="w-4 h-4 text-brand-400"></i>
                <span>Open Entrance Gates & Counters</span>
              </h4>

              <div className="space-y-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 max-h-44 overflow-y-auto">
                {location.counters.map(counter => (
                  <div key={counter.id} className="flex items-center justify-between p-2.5 bg-slate-900 rounded-xl text-xs border border-slate-800">
                    <div>
                      <span className="font-semibold text-white block">{counter.name}</span>
                      <span className="text-[10px] text-slate-400">{counter.queueLength} citizens in physical line</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-saffron-400 block">{counter.waitMinutes}m wait</span>
                      <span className="text-[10px] text-emerald-400">Gate Throttled</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Action Row */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
            >
              Close Details
            </button>

            <button
              onClick={() => onJoinQueue(location)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-xs shadow-xl glow-blue flex items-center gap-2"
            >
              <i data-lucide="ticket" className="w-4 h-4"></i>
              <span>Join Virtual Queue Remotely</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

window.LocationDetailModal = LocationDetailModal;
