// FlowSense AI - Global State & Real-Time Simulation Engine

const CrowdContext = React.createContext();

function CrowdProvider({ children }) {
  const [locations, setLocations] = React.useState(window.INITIAL_LOCATIONS);
  const [alerts, setAlerts] = React.useState(window.INITIAL_ALERTS);
  const [queues, setQueues] = React.useState(window.INITIAL_QUEUES);
  const [cameraFeeds, setCameraFeeds] = React.useState(window.CAMERA_FEEDS);
  
  const [currentView, setCurrentView] = React.useState('landing'); // landing | citizen | admin | kiosk
  const [selectedLocationId, setSelectedLocationId] = React.useState(null);
  const [activeTicket, setActiveTicket] = React.useState(window.INITIAL_QUEUES[0] || null);
  
  const [simulationRunning, setSimulationRunning] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedCity, setSelectedCity] = React.useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = React.useState('All');

  // Audio Synth for Queue Alert Notification
  const playAlertChime = React.useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio playback prevented or unsupported');
    }
  }, [soundEnabled]);

  // Real-time dynamic simulation ticker
  React.useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(() => {
      // 1. Fluctuate location counts realistically
      setLocations(prevLocations => {
        return prevLocations.map(loc => {
          const delta = Math.floor(Math.random() * 41) - 18; // -18 to +22
          const newCount = Math.max(50, Math.min(loc.capacity, loc.currentCount + delta));
          const pct = (newCount / loc.capacity) * 100;
          
          let newStatus = 'Low';
          if (pct >= 85) newStatus = 'Critical';
          else if (pct >= 70) newStatus = 'High';
          else if (pct >= 45) newStatus = 'Moderate';

          return {
            ...loc,
            currentCount: newCount,
            status: newStatus
          };
        });
      });

      // 2. Advance active virtual queue positions
      setQueues(prevQueues => {
        return prevQueues.map(q => {
          if (q.status === 'Waiting' && q.position > 1) {
            // 30% chance per tick to step forward in queue
            if (Math.random() < 0.35) {
              const nextPos = q.position - 1;
              const nextWait = Math.max(1, Math.round(nextPos * 2.5));
              
              if (nextPos <= 2) {
                playAlertChime();
              }
              
              const updated = {
                ...q,
                position: nextPos,
                estimatedWaitMinutes: nextWait
              };

              if (activeTicket && activeTicket.id === q.id) {
                setActiveTicket(updated);
              }
              return updated;
            }
          }
          return q;
        });
      });

      // 3. Fluctuate CCTV camera sensor counts
      setCameraFeeds(prevFeeds => {
        return prevFeeds.map(feed => {
          if (feed.status !== 'Active') return feed;
          const shift = Math.floor(Math.random() * 11) - 5;
          return {
            ...feed,
            detectedCount: Math.max(10, feed.detectedCount + shift)
          };
        });
      });

    }, 3500);

    return () => clearInterval(interval);
  }, [simulationRunning, playAlertChime, activeTicket]);

  // Actions
  const joinQueue = (location, counter, userData) => {
    const randomNum = Math.floor(Math.random() * 900) + 100;
    const tokenCode = `${location.shortName.substring(0, 4).toUpperCase()}-${counter.name.charAt(8) || 'A'}-${randomNum}`;
    const initialPos = Math.floor(Math.random() * 8) + 3; // 3 to 10
    const estWait = Math.round(initialPos * 3);

    const newTicket = {
      id: 'tkn-' + Date.now(),
      locationId: location.id,
      locationName: location.name,
      counterName: counter.name,
      userName: userData.name,
      userPhone: userData.phone,
      partySize: userData.partySize || 1,
      position: initialPos,
      tokenNo: tokenCode,
      estimatedWaitMinutes: estWait,
      status: 'Waiting',
      joinedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hasAssistance: userData.hasAssistance || false,
      qrCodeData: `FLOWSENSE:${tokenCode}:${userData.name}:${location.shortName}`
    };

    setQueues(prev => [newTicket, ...prev]);
    setActiveTicket(newTicket);
    playAlertChime();

    // Trigger celebration confetti
    if (window.confetti) {
      window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
    }

    return newTicket;
  };

  const leaveQueue = (ticketId) => {
    setQueues(prev => prev.filter(q => q.id !== ticketId));
    if (activeTicket && activeTicket.id === ticketId) {
      setActiveTicket(null);
    }
  };

  const addLocation = (newLocData) => {
    const newLoc = {
      id: 'loc-' + Date.now(),
      name: newLocData.name,
      shortName: newLocData.shortName || newLocData.name.substring(0, 15),
      city: newLocData.city,
      state: newLocData.state || 'India',
      category: newLocData.category,
      address: newLocData.address || `${newLocData.city}, India`,
      capacity: parseInt(newLocData.capacity, 10) || 5000,
      currentCount: parseInt(newLocData.currentCount, 10) || 500,
      status: 'Low',
      safetyThreshold: parseInt(newLocData.safetyThreshold, 10) || 85,
      avgWaitMinutes: 10,
      openGates: ['Main Gate 1', 'North Exit Gate 2'],
      activeCameras: 4,
      totalCameras: 4,
      coordinates: { lat: 19.0760, lng: 72.8777 },
      image: newLocData.image || 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      description: newLocData.description || 'Public facility monitored by FlowSense AI.',
      bestTimeWindow: '13:00 - 15:00 today',
      activeAlertsCount: 0,
      counters: [
        { id: 'c1', name: 'General Counter A', waitMinutes: 10, queueLength: 15 },
        { id: 'c2', name: 'Priority Express B', waitMinutes: 5, queueLength: 5 }
      ]
    };

    setLocations(prev => [newLoc, ...prev]);
  };

  const addAlert = (alertMsg, severity, locationId = 'loc-1') => {
    const targetLoc = locations.find(l => l.id === locationId) || locations[0];
    const newAlert = {
      id: 'alt-' + Date.now(),
      locationId: targetLoc.id,
      locationName: targetLoc.shortName,
      message: alertMsg,
      severity: severity, // critical | high | moderate
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      isResolved: false
    };

    setAlerts(prev => [newAlert, ...prev]);
    playAlertChime();
  };

  const resolveAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isResolved: true } : a));
  };

  const toggleCameraFeed = (feedId) => {
    setCameraFeeds(prev => prev.map(f => f.id === feedId ? { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' } : f));
  };

  const value = {
    locations,
    alerts,
    queues,
    cameraFeeds,
    currentView,
    setCurrentView,
    selectedLocationId,
    setSelectedLocationId,
    activeTicket,
    setActiveTicket,
    simulationRunning,
    setSimulationRunning,
    soundEnabled,
    setSoundEnabled,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCity,
    setSelectedCity,
    selectedStatusFilter,
    setSelectedStatusFilter,
    joinQueue,
    leaveQueue,
    addLocation,
    addAlert,
    resolveAlert,
    toggleCameraFeed,
    playAlertChime
  };

  return (
    <CrowdContext.Provider value={value}>
      {children}
    </CrowdContext.Provider>
  );
}

window.CrowdContext = CrowdContext;
window.CrowdProvider = CrowdProvider;
