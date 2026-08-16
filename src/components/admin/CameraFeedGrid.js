// FlowSense AI - CCTV Vision Sensor Feeds Control Room

function CameraFeedGrid() {
  const { cameraFeeds, toggleCameraFeed, addAlert } = React.useContext(window.CrowdContext);

  const [aiMode, setAiMode] = React.useState('Density Heatmap');
  const [activeScans, setActiveScans] = React.useState({}); // feedId -> { loading, result }

  const handleGeminiScan = async (feed) => {
    setActiveScans(prev => ({ ...prev, [feed.id]: { loading: true, result: '' } }));
    try {
      if (window.GeminiService && window.GeminiService.hasValidKey()) {
        const res = await window.GeminiService.analyzeCameraFeed(feed);
        setActiveScans(prev => ({ ...prev, [feed.id]: { loading: false, result: res } }));
      } else {
        setTimeout(() => {
          setActiveScans(prev => ({
            ...prev,
            [feed.id]: {
              loading: false,
              result: `### 🎯 Gemini Vision Stream Report (${feed.name})
- **Density Vector**: High crowd flow towards Gate 1 (Count: ${feed.detectedCount})
- **Risk Assessment**: Moderate Bottleneck Risk. Velocity ~0.6m/s.
- **Recommended Officer Action**: Dispatch 2 security marshals to divert crowd flow to West Auxiliary Gate.`
            }
          }));
        }, 800);
      }
    } catch (err) {
      setActiveScans(prev => ({ ...prev, [feed.id]: { loading: false, result: `⚠️ Error: ${err.message}` } }));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="font-heading font-bold text-lg text-white flex items-center gap-2">
            <i data-lucide="video" className="w-5 h-5 text-rose-400"></i>
            <span>AI CCTV Camera Feed Array & Vision Analytics</span>
          </h2>
          <p className="text-xs text-slate-400">Real-time neural object detection, optical flow velocity, and density map monitoring.</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-medium">Global AI Mode:</label>
          <select
            value={aiMode}
            onChange={(e) => setAiMode(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
          >
            <option value="Density Heatmap">Density Heatmap & Bounding Boxes</option>
            <option value="Person Counter">Person Counter & Vector Flow</option>
            <option value="Bottleneck Warning">Stampede / Bottleneck Warning</option>
          </select>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cameraFeeds.map((feed, idx) => (
          <div 
            key={feed.id} 
            className="glass-card rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between shadow-xl"
          >
            
            {/* Feed Header */}
            <div className="p-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${feed.status === 'Active' ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`}></span>
                <span className="font-bold text-white font-heading">{feed.name}</span>
                <span className="text-[10px] text-slate-400">({feed.locationName})</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${feed.status === 'Active' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'}`}>
                  {feed.status}
                </span>

                <button
                  onClick={() => toggleCameraFeed(feed.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition ${
                    feed.status === 'Active' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {feed.status === 'Active' ? 'Disable Feed' : 'Activate Feed'}
                </button>
              </div>
            </div>

            {/* Simulated Live Video Display Frame */}
            <div className="relative h-60 bg-slate-950 overflow-hidden group">
              {feed.status === 'Active' ? (
                <>
                  <img src={feed.streamUrl} alt={feed.name} className="w-full h-full object-cover" />

                  {/* Simulated AI Overlays */}
                  <div className="absolute inset-0 pointer-events-none p-4">
                    {/* Bounding box 1 */}
                    <div className="border-2 border-emerald-400/80 rounded w-16 h-20 absolute top-8 left-12 animate-pulse">
                      <span className="bg-emerald-500 text-slate-950 font-bold text-[9px] px-1 absolute -top-4 left-0">P#401 (0.94)</span>
                    </div>

                    {/* Bounding box 2 */}
                    <div className="border-2 border-emerald-400/80 rounded w-14 h-18 absolute top-12 left-32">
                      <span className="bg-emerald-500 text-slate-950 font-bold text-[9px] px-1 absolute -top-4 left-0">P#402 (0.91)</span>
                    </div>

                    {/* Density Heat Zone */}
                    <div className="border-2 border-rose-500/80 bg-rose-500/10 rounded-2xl w-40 h-28 absolute bottom-4 right-6 animate-pulse">
                      <span className="bg-rose-600 text-white font-bold text-[9px] px-1.5 py-0.5 absolute -top-5 left-2 rounded">HIGH DENSITY SURGE</span>
                    </div>
                  </div>

                  {/* Corner Overlay Metadata */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-[10px] text-slate-300 font-mono border border-slate-800">
                    AI Mode: <strong className="text-brand-300">{aiMode}</strong>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-[10px] text-slate-300 border border-slate-800">
                    Detected Persons: <strong className="text-white text-xs">{feed.detectedCount}</strong> | Density Score: <strong className="text-saffron-400">{feed.densityScore}/100</strong>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-2">
                  <i data-lucide="video-off" className="w-10 h-10"></i>
                  <span className="text-xs font-semibold">Camera Stream Offline / Disabled</span>
                </div>
              )}
            </div>

            {/* Feed Footer Actions */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-[11px] text-slate-400">RTSP/H.265 Encoded</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleGeminiScan(feed)}
                  disabled={activeScans[feed.id]?.loading}
                  className="px-2.5 py-1 bg-purple-950/80 border border-purple-500/40 text-purple-200 hover:bg-purple-900/80 rounded text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-50"
                >
                  <i data-lucide="sparkles" className={`w-3 h-3 text-saffron-400 ${activeScans[feed.id]?.loading ? 'animate-spin' : ''}`}></i>
                  <span>{activeScans[feed.id]?.loading ? 'Scanning...' : 'Gemini Vision Scan'}</span>
                </button>

                <button
                  onClick={() => addAlert(`MANUAL CAMERA DISPATCH: Operator flagged density spike on ${feed.name}`, 'high', feed.locationId)}
                  className="px-2.5 py-1 bg-amber-950/80 border border-amber-500/40 text-amber-300 hover:bg-amber-900/80 rounded text-[11px] font-semibold"
                >
                  Trigger Alert
                </button>
              </div>
            </div>

            {/* GEMINI VISION SCAN RESULT DISPLAY */}
            {activeScans[feed.id]?.result && (
              <div className="p-3 bg-slate-950 border-t border-purple-500/30 text-xs text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 font-bold border-b border-slate-800 pb-1">
                  <span>GOOGLE GEMINI VISION INTELLIGENCE REPORT</span>
                  <button onClick={() => setActiveScans(prev => ({ ...prev, [feed.id]: { loading: false, result: '' } }))} className="hover:text-white">✕</button>
                </div>
                <div className="text-[11px] text-slate-200 whitespace-pre-line leading-relaxed pt-1">
                  {activeScans[feed.id].result}
                </div>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}

window.CameraFeedGrid = CameraFeedGrid;
