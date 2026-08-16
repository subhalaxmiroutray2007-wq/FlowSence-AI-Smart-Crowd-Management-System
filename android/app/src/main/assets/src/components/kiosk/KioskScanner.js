// FlowSense AI - Gate Scanner & Check-in Kiosk

function KioskScanner() {
  const { locations, queues, setQueues, setLocations } = React.useContext(window.CrowdContext);

  const [selectedLocId, setSelectedLocId] = React.useState(locations[0]?.id || 'loc-1');
  const [manualToken, setManualToken] = React.useState('');
  const [torchActive, setTorchActive] = React.useState(false);
  const [cameraFacing, setCameraFacing] = React.useState('environment'); // 'environment' | 'user'
  const [lastCheckIn, setLastCheckIn] = React.useState(null);
  const [checkInHistory, setCheckInHistory] = React.useState([
    { tokenNo: 'TIRU-B-072', name: 'Rohan Deshmukh', gate: 'Gate 2 SSD', time: '20:14 PM' },
    { tokenNo: 'DADAR-A-102', name: 'Priya Iyer', gate: 'Footover Bridge 1', time: '20:10 PM' }
  ]);

  const targetLoc = locations.find(l => l.id === selectedLocId) || locations[0];

  const handleScanCheckIn = (tokenInput) => {
    const tokenToProcess = tokenInput || manualToken;
    if (!tokenToProcess.trim()) return;

    if (window.HapticsService) {
      window.HapticsService.success();
    }

    // Find in queues or create dummy valid scan
    const matchedQueue = queues.find(q => q.tokenNo.toLowerCase() === tokenToProcess.toLowerCase());
    
    const entryRecord = {
      tokenNo: tokenToProcess.toUpperCase(),
      name: matchedQueue ? matchedQueue.userName : 'Citizen Guest',
      gate: targetLoc.openGates[0] || 'Main Entry Gate',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setLastCheckIn(entryRecord);
    setCheckInHistory(prev => [entryRecord, ...prev]);

    // Auto update capacity (decrement queue position / update headcount)
    setLocations(prev => prev.map(loc => {
      if (loc.id === targetLoc.id) {
        return {
          ...loc,
          currentCount: Math.min(loc.capacity, loc.currentCount + (matchedQueue ? matchedQueue.partySize : 1))
        };
      }
      return loc;
    }));

    if (matchedQueue) {
      setQueues(prev => prev.filter(q => q.id !== matchedQueue.id));
    }

    setManualToken('');

    if (window.confetti) {
      window.confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
    }
  };

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-2.5">
            <i data-lucide="qr-code" className="w-7 h-7 sm:w-8 sm:h-8 text-brand-400"></i>
            <span>Gate Entrance QR Check-In Scanner</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Mobile scanner kiosk for security guards at public facility gates.
          </p>
        </div>

        <div className="w-full sm:w-64">
          <label className="text-[11px] text-slate-400 font-medium block mb-1">Current Gate Location:</label>
          <select
            value={selectedLocId}
            onChange={(e) => setSelectedLocId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white"
          >
            {locations.map(l => (
              <option key={l.id} value={l.id}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* SCANNER INTERFACE CARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Visual Camera Scanner Frame */}
        <div className="glass-card p-5 sm:p-6 rounded-3xl border border-slate-800 flex flex-col items-center justify-center space-y-4 text-center">
          
          {/* Mobile Camera Controls Bar */}
          <div className="flex items-center justify-between w-full px-2 text-xs">
            <span className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Camera ({cameraFacing === 'environment' ? 'Rear' : 'Front'})</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setTorchActive(!torchActive)}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                  torchActive ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-300'
                }`}
                title="Toggle Flashlight Torch"
              >
                <i data-lucide={torchActive ? 'zap' : 'zap-off'} className="w-4 h-4"></i>
                <span className="hidden xs:inline text-[10px]">{torchActive ? 'Torch On' : 'Torch Off'}</span>
              </button>

              <button
                onClick={() => setCameraFacing(prev => prev === 'environment' ? 'user' : 'environment')}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Switch Camera Direction"
              >
                <i data-lucide="refresh-cw" className="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <div className={`relative w-full max-w-[280px] h-64 bg-slate-950 rounded-2xl border-2 ${torchActive ? 'border-amber-400 shadow-xl shadow-amber-500/20' : 'border-brand-500/50'} flex flex-col items-center justify-center p-4 overflow-hidden group transition-all`}>
            {/* Animated Laser Scanning Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-lg animate-bounce"></div>
            
            <i data-lucide="qr-code" className={`w-32 h-32 ${torchActive ? 'text-amber-400/30' : 'text-slate-700'} transition-all`}></i>

            <span className="text-[11px] text-brand-300 font-mono mt-2 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
              ALIGN CITIZEN QR TOKEN
            </span>
          </div>

          <button
            onClick={() => handleScanCheckIn('SCAN-LIVE-' + Math.floor(Math.random()*900+100))}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl text-xs font-semibold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <i data-lucide="camera" className="w-4 h-4"></i>
            <span>Simulate Quick QR Camera Scan</span>
          </button>
        </div>

        {/* Manual Token Verification */}
        <div className="glass-card p-6 rounded-3xl border border-slate-800 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-white">Manual Token Verification</h3>
            <p className="text-xs text-slate-400">If citizen's phone battery is drained, enter token number manually:</p>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="e.g. TIRU-B-084"
                value={manualToken}
                onChange={(e) => setManualToken(e.target.value)}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 uppercase"
              />
              <button
                onClick={() => handleScanCheckIn()}
                className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <i data-lucide="check-circle" className="w-4 h-4"></i>
                <span>Verify Token & Allow Gate Entry</span>
              </button>
            </div>
          </div>

          {/* Last Checked In Result Badge */}
          {lastCheckIn && (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-emerald-300 space-y-1 animate-pulse">
              <span className="text-[10px] uppercase font-bold text-emerald-400">✅ ENTRY GRANTED</span>
              <p className="font-bold text-sm text-white">{lastCheckIn.name} ({lastCheckIn.tokenNo})</p>
              <p className="text-[11px] text-slate-300">Checked in at {lastCheckIn.time} • {lastCheckIn.gate}</p>
            </div>
          )}

        </div>

      </div>

      {/* RECENT ENTRIES LOG */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="font-heading font-bold text-base text-white">Recent Gate Entry Logs</h3>
        
        <div className="divide-y divide-slate-800">
          {checkInHistory.map((item, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-brand-300 font-bold">{item.tokenNo}</span>
                <span className="text-white font-medium">{item.name}</span>
              </div>
              <div className="text-slate-400 text-right">
                <span className="block">{item.gate}</span>
                <span className="text-[10px] text-slate-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

window.KioskScanner = KioskScanner;
