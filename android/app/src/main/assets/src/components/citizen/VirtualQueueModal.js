// FlowSense AI - Virtual Queue Join & Digital Token Ticket Modal

function VirtualQueueModal({ location, onClose }) {
  const { joinQueue, activeTicket, leaveQueue } = React.useContext(window.CrowdContext);

  const [selectedCounterId, setSelectedCounterId] = React.useState(location.counters[0]?.id || 'c1');
  const [userName, setUserName] = React.useState('');
  const [userPhone, setUserPhone] = React.useState('');
  const [partySize, setPartySize] = React.useState(1);
  const [hasAssistance, setHasAssistance] = React.useState(false);
  const [createdTicket, setCreatedTicket] = React.useState(null);

  const qrCanvasRef = React.useRef(null);

  // If user already has an active ticket for this location or overall
  const displayTicket = createdTicket || (activeTicket && activeTicket.locationId === location.id ? activeTicket : null);

  // Render QR code canvas using QRious
  React.useEffect(() => {
    if (displayTicket && qrCanvasRef.current && window.QRious) {
      new window.QRious({
        element: qrCanvasRef.current,
        value: displayTicket.qrCodeData || `FLOWSENSE:${displayTicket.tokenNo}`,
        size: 160,
        level: 'H',
        foreground: '#0f172a',
        background: '#ffffff'
      });
    }
  }, [displayTicket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    const counterObj = location.counters.find(c => c.id === selectedCounterId) || location.counters[0];
    const ticket = joinQueue(location, counterObj, {
      name: userName,
      phone: userPhone,
      partySize: parseInt(partySize, 10),
      hasAssistance: hasAssistance
    });

    if (window.HapticsService) {
      window.HapticsService.success();
    }

    setCreatedTicket(ticket);
  };

  const handleSaveOfflinePass = () => {
    if (window.HapticsService) window.HapticsService.success();
    if (displayTicket) {
      try {
        localStorage.setItem('flowsense_offline_ticket', JSON.stringify(displayTicket));
        alert(`✅ Digital Pass #${displayTicket.tokenNo} saved to phone storage for offline gate access!`);
      } catch(e) {
        alert('Pass ready offline!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-5">
        
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] text-saffron-400 font-bold uppercase tracking-wider">Virtual Queue Gateway</span>
            <h2 className="font-heading font-extrabold text-xl text-white">{location.name}</h2>
            <p className="text-xs text-slate-400">{location.city}, {location.state}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <i data-lucide="x" className="w-5 h-5"></i>
          </button>
        </div>

        {/* DISPLAY TICKET VIEW IF CREATED / ACTIVE */}
        {displayTicket ? (
          <div className="space-y-5 text-center">
            
            <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-2xl text-emerald-300 text-xs flex items-center justify-center gap-2">
              <i data-lucide="check-circle-2" className="w-4 h-4 text-emerald-400"></i>
              <span>Queue Token Successfully Issued! Live status active.</span>
            </div>

            {/* DIGITAL PASS TICKET CONTAINER */}
            <div className="bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-brand-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden space-y-4">
              
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
                <span className="font-mono text-brand-300 flex items-center gap-1">
                  <i data-lucide="smartphone" className="w-3.5 h-3.5"></i>
                  <span>FLOWSENSE MOBILE PASS</span>
                </span>
                <span>{displayTicket.joinedAt}</span>
              </div>

              {/* TOKEN NUMBER DISPLAY */}
              <div className="py-1">
                <span className="text-xs text-slate-400 block font-medium">YOUR TOKEN NUMBER</span>
                <p className="text-3xl sm:text-4xl font-extrabold font-heading text-saffron-400 tracking-wider">
                  {displayTicket.tokenNo}
                </p>
              </div>

              {/* QR Code Canvas */}
              <div className="flex justify-center py-1">
                <div className="p-3 bg-white rounded-2xl shadow-inner border border-slate-200">
                  <canvas ref={qrCanvasRef}></canvas>
                </div>
              </div>

              {/* Queue Live Metrics */}
              <div className="grid grid-cols-2 gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Position in Line</span>
                  <span className="text-3xl font-extrabold font-heading text-white">#{displayTicket.position}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-semibold">Est. Wait Time</span>
                  <span className="text-2xl font-extrabold font-heading text-brand-400">~{displayTicket.estimatedWaitMinutes} mins</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <p className="font-semibold text-white">{displayTicket.userName} (Party of {displayTicket.partySize})</p>
                <p className="text-[11px] text-slate-400">{displayTicket.counterName}</p>
                {displayTicket.hasAssistance && (
                  <span className="inline-block bg-purple-900/60 text-purple-200 text-[10px] px-2 py-0.5 rounded font-medium mt-1">
                    ♿ Senior / Wheelchair Assistance Priority
                  </span>
                )}
              </div>

              <button
                onClick={handleSaveOfflinePass}
                className="w-full py-2 bg-slate-900 hover:bg-slate-850 border border-slate-700/80 rounded-xl text-[11px] font-semibold text-brand-300 flex items-center justify-center gap-2"
              >
                <i data-lucide="download" className="w-3.5 h-3.5 text-brand-400"></i>
                <span>Save Ticket Offline to Phone</span>
              </button>

            </div>

            {/* Ticket Actions */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                onClick={() => { leaveQueue(displayTicket.id); setCreatedTicket(null); }}
                className="px-3.5 py-2.5 bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900/60 rounded-xl text-xs font-semibold"
              >
                Cancel Queue
              </button>

              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow"
              >
                Done / Close Ticket
              </button>
            </div>

          </div>
        ) : (
          /* QUEUE FORM */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Select Counter */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Select Entrance Gate / Counter</label>
              <select
                value={selectedCounterId}
                onChange={(e) => setSelectedCounterId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              >
                {location.counters.map(counter => (
                  <option key={counter.id} value={counter.id}>
                    {counter.name} — ({counter.waitMinutes} mins wait)
                  </option>
                ))}
              </select>
            </div>

            {/* Visitor Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Primary Visitor Name *</label>
              <input
                type="text"
                required
                placeholder="Enter full name (e.g. Rajesh Kumar)"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">Mobile Phone Number (For SMS / Alert)</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Party Size & Assistance Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">Party Size</label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
                >
                  {[1,2,3,4,5,6,8,10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'Persons'}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasAssistance}
                    onChange={(e) => setHasAssistance(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-brand-500 focus:ring-brand-500"
                  />
                  <span>Senior Citizen / Disability Assistance</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white rounded-xl text-xs font-semibold shadow-lg glow-blue flex items-center gap-2"
              >
                <i data-lucide="ticket" className="w-4 h-4"></i>
                <span>Generate Digital Token Pass</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}

window.VirtualQueueModal = VirtualQueueModal;
