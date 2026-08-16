// FlowSense AI - Primary Mock Dataset for Indian Public Venues

window.INITIAL_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Tirupati Balaji Temple (Vaikuntam Queue Complex 2)',
    shortName: 'Tirupati Balaji',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    category: 'Temples & Festivals',
    address: 'Tirumala Hills, Tirupati, Andhra Pradesh 517504',
    capacity: 15000,
    currentCount: 12900,
    status: 'Critical',
    safetyThreshold: 85, // %
    avgWaitMinutes: 45,
    openGates: ['Gate 1 (Vaikuntam VIP)', 'Gate 2 (General SSD)', 'Gate 3 (Divya Darshan)', 'Gate 4 (Senior Citizen)'],
    activeCameras: 12,
    totalCameras: 14,
    coordinates: { lat: 13.6833, lng: 79.3500 },
    image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=800&q=80',
    description: 'World famous pilgrimage destination with heavy continuous influx. Dynamic queue management and SSD token system in operation.',
    bestTimeWindow: '14:00 - 16:30 today (Predicted ~25% capacity)',
    activeAlertsCount: 2,
    counters: [
      { id: 'c1', name: 'Counter A - General SSD Darshan', waitMinutes: 50, queueLength: 320 },
      { id: 'c2', name: 'Counter B - Special Entry (Rs 300)', waitMinutes: 25, queueLength: 140 },
      { id: 'c3', name: 'Counter C - Senior & Divyangjan', waitMinutes: 10, queueLength: 35 }
    ]
  },
  {
    id: 'loc-2',
    name: 'Dadar Central Station (Platform 3 & Concourse)',
    shortName: 'Dadar Railway Station',
    city: 'Mumbai',
    state: 'Maharashtra',
    category: 'Train Stations',
    address: 'Dadar East, Mumbai, Maharashtra 400014',
    capacity: 8500,
    currentCount: 6800,
    status: 'High',
    safetyThreshold: 80,
    avgWaitMinutes: 18,
    openGates: ['Bridge 1 Foot Overbridge', 'Bridge 2 Skywalk', 'Platform 3 North Gate'],
    activeCameras: 8,
    totalCameras: 8,
    coordinates: { lat: 19.0178, lng: 72.8478 },
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    description: 'Major suburban and long-distance rail hub connecting Central & Western railways in Mumbai.',
    bestTimeWindow: '11:30 - 14:00 (Post peak morning surge)',
    activeAlertsCount: 1,
    counters: [
      { id: 'c1', name: 'Ticket Window 1-4 (ATVM Hub)', waitMinutes: 12, queueLength: 85 },
      { id: 'c2', name: 'UTSB Mobile QR Assistance', waitMinutes: 4, queueLength: 15 }
    ]
  },
  {
    id: 'loc-3',
    name: 'Rajiv Chowk Metro Station (Yellow-Blue Interchange)',
    shortName: 'Rajiv Chowk Metro',
    city: 'New Delhi',
    state: 'Delhi NCR',
    category: 'Metro Stations',
    address: 'Connaught Place, New Delhi, Delhi 110001',
    capacity: 12000,
    currentCount: 7400,
    status: 'Moderate',
    safetyThreshold: 85,
    avgWaitMinutes: 8,
    openGates: ['Gate 1 (Radial 1)', 'Gate 2 (Palika Bazaar)', 'Gate 7 (Janpath)', 'Gate 8 (F Block)'],
    activeCameras: 16,
    totalCameras: 16,
    coordinates: { lat: 28.6328, lng: 77.2197 },
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    description: 'Highest traffic metro interchange hub in India connecting Blue and Yellow Delhi Metro corridors.',
    bestTimeWindow: '13:00 - 16:00 (Mid-day lull)',
    activeAlertsCount: 0,
    counters: [
      { id: 'c1', name: 'Security Checkpoint A (Blue Line)', waitMinutes: 8, queueLength: 60 },
      { id: 'c2', name: 'Security Checkpoint B (Yellow Line)', waitMinutes: 10, queueLength: 90 },
      { id: 'c3', name: 'Customer Service & Card Recharge', waitMinutes: 5, queueLength: 20 }
    ]
  },
  {
    id: 'loc-4',
    name: 'Lalbaugcha Raja Festival Ground',
    shortName: 'Lalbaugcha Raja',
    city: 'Mumbai',
    state: 'Maharashtra',
    category: 'Temples & Festivals',
    address: 'Lalbaug, Parel, Mumbai, Maharashtra 400012',
    capacity: 25000,
    currentCount: 22100,
    status: 'Critical',
    safetyThreshold: 85,
    avgWaitMinutes: 90,
    openGates: ['Mukh Darshan Gate', 'Navsachichi Line Gate 1', 'VIP Gate 4'],
    activeCameras: 20,
    totalCameras: 22,
    coordinates: { lat: 18.9912, lng: 72.8397 },
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    description: 'Premier festival location during Ganeshotsav drawing over a million devotees daily.',
    bestTimeWindow: '03:00 - 05:30 AM (Early morning darshan line)',
    activeAlertsCount: 3,
    counters: [
      { id: 'c1', name: 'Mukh Darshan Line (Fast Pass)', waitMinutes: 45, queueLength: 550 },
      { id: 'c2', name: 'Charan Sparsh Navsachi Line', waitMinutes: 120, queueLength: 1400 }
    ]
  },
  {
    id: 'loc-5',
    name: 'Regional Passport Seva Kendra (Koramangala)',
    shortName: 'Passport Kendra Blr',
    city: 'Bengaluru',
    state: 'Karnataka',
    category: 'Government Offices',
    address: '80 Feet Road, 8th Block, Koramangala, Bengaluru 560095',
    capacity: 800,
    currentCount: 320,
    status: 'Low',
    safetyThreshold: 75,
    avgWaitMinutes: 12,
    openGates: ['Main Entry Counter', 'Counter A Document Verification', 'Counter B Biometrics'],
    activeCameras: 6,
    totalCameras: 6,
    coordinates: { lat: 12.9352, lng: 77.6245 },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    description: 'High-efficiency government service center with digital token queue management.',
    bestTimeWindow: '10:00 - 11:30 AM (Smooth document processing)',
    activeAlertsCount: 0,
    counters: [
      { id: 'c1', name: 'Token Counter A (Document Verification)', waitMinutes: 10, queueLength: 25 },
      { id: 'c2', name: 'Token Counter B (Biometric Capturing)', waitMinutes: 15, queueLength: 40 },
      { id: 'c3', name: 'Counter C (Granting Officer)', waitMinutes: 8, queueLength: 12 }
    ]
  },
  {
    id: 'loc-6',
    name: 'Golden Temple (Harmandir Sahib Concourse)',
    shortName: 'Golden Temple Amritsar',
    city: 'Amritsar',
    state: 'Punjab',
    category: 'Temples & Festivals',
    address: 'Golden Temple Road, Amritsar, Punjab 143006',
    capacity: 18000,
    currentCount: 10200,
    status: 'Moderate',
    safetyThreshold: 80,
    avgWaitMinutes: 25,
    openGates: ['Ghanta Ghar Entry', 'Langar Hall Complex', 'Manji Sahib Gate'],
    activeCameras: 14,
    totalCameras: 14,
    coordinates: { lat: 31.6200, lng: 74.8765 },
    image: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=800&q=80',
    description: 'Sacred spiritual sanctuary receiving continuous flow of global visitors and community langar diners.',
    bestTimeWindow: '22:00 - 01:00 (Serene late night hours)',
    activeAlertsCount: 0,
    counters: [
      { id: 'c1', name: 'Main Sanctum Bridge Line', waitMinutes: 30, queueLength: 410 },
      { id: 'c2', name: 'Langar Seva Entry', waitMinutes: 10, queueLength: 180 }
    ]
  }
];

window.INITIAL_ALERTS = [
  {
    id: 'alt-101',
    locationId: 'loc-1',
    locationName: 'Tirupati Balaji Temple',
    message: 'CRITICAL OVERCROWDING: Sanctum capacity reached 86%. Diverting Gate 2 SSD queues to Vaikuntam Complex 3 holding bay.',
    severity: 'critical',
    timeAgo: '4 mins ago',
    timestamp: new Date(Date.now() - 4 * 60000).toISOString(),
    isResolved: false
  },
  {
    id: 'alt-102',
    locationId: 'loc-4',
    locationName: 'Lalbaugcha Raja',
    message: 'STAMPEDE SAFETY WARNING: Mukh Darshan queue velocity decreased by 40%. Throttling Gate 1 entry rate to 50 persons/min.',
    severity: 'critical',
    timeAgo: '12 mins ago',
    timestamp: new Date(Date.now() - 12 * 60000).toISOString(),
    isResolved: false
  },
  {
    id: 'alt-103',
    locationId: 'loc-2',
    locationName: 'Dadar Central Station',
    message: 'Peak commuter surge on Footover Bridge 2. Extra RP Force personnel deployed to clear bottlenecks.',
    severity: 'high',
    timeAgo: '28 mins ago',
    timestamp: new Date(Date.now() - 28 * 60000).toISOString(),
    isResolved: false
  },
  {
    id: 'alt-104',
    locationId: 'loc-3',
    locationName: 'Rajiv Chowk Metro',
    message: 'Heatwave advisory: Free hydration stations activated at Gate 6 & Gate 8.',
    severity: 'moderate',
    timeAgo: '1 hr ago',
    timestamp: new Date(Date.now() - 60 * 60000).toISOString(),
    isResolved: true
  }
];

window.INITIAL_QUEUES = [
  {
    id: 'tkn-8492',
    locationId: 'loc-1',
    locationName: 'Tirupati Balaji Temple',
    counterName: 'Counter B - Special Entry (Rs 300)',
    userName: 'Aarav Sharma',
    userPhone: '+91 98765 43210',
    partySize: 2,
    position: 4,
    tokenNo: 'TIRU-B-084',
    estimatedWaitMinutes: 8,
    status: 'Waiting',
    joinedAt: '20:05 PM',
    hasAssistance: false,
    qrCodeData: 'FLOWSENSE:TIRU-B-084:AARAV:POS4'
  }
];

window.CAMERA_FEEDS = [
  {
    id: 'cam-1',
    locationId: 'loc-1',
    locationName: 'Tirupati Balaji',
    name: 'Sanctum Entrance Cam 01',
    streamUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80',
    status: 'Active',
    detectedCount: 412,
    densityScore: 92,
    aiMode: 'Density Heatmap & Object Counting'
  },
  {
    id: 'cam-2',
    locationId: 'loc-1',
    locationName: 'Tirupati Balaji',
    name: 'Gate 2 Ingress Barrier',
    streamUrl: 'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=600&q=80',
    status: 'Active',
    detectedCount: 285,
    densityScore: 78,
    aiMode: 'Velocity & Bottleneck Detection'
  },
  {
    id: 'cam-3',
    locationId: 'loc-2',
    locationName: 'Dadar Railway Station',
    name: 'Platform 3 Footover Bridge',
    streamUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=600&q=80',
    status: 'Active',
    detectedCount: 310,
    densityScore: 84,
    aiMode: 'Flow Direction Tracking'
  },
  {
    id: 'cam-4',
    locationId: 'loc-3',
    locationName: 'Rajiv Chowk Metro',
    name: 'Yellow-Blue Line Concourse B',
    streamUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    status: 'Active',
    detectedCount: 198,
    densityScore: 61,
    aiMode: 'Social Spacing & Anomaly Detection'
  }
];

// Helper to generate 24h trend history & 24h AI predictions
window.generateCrowdTrendData = function(locationCapacity, currentCount) {
  const history = [];
  const hours = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
  
  // Historical pattern for past 24 hours
  hours.forEach((h, i) => {
    let multiplier = 0.3;
    if (i >= 3 && i <= 5) multiplier = 0.85; // Morning rush
    else if (i >= 8 && i <= 10) multiplier = 0.95; // Evening rush
    else if (i > 5 && i < 8) multiplier = 0.45; // Afternoon dip
    
    const count = Math.min(locationCapacity, Math.round(locationCapacity * multiplier * (0.85 + Math.random() * 0.25)));
    history.push({
      time: h,
      headcount: count,
      capacityPct: Math.round((count / locationCapacity) * 100),
      isHistorical: true
    });
  });

  // Future 24-48h AI Forecast
  const forecast = [];
  const futureHours = ['24:00', '+2h', '+4h', '+6h', '+8h', '+10h', '+12h', '+16h', '+20h', '+24h'];
  futureHours.forEach((h, i) => {
    let mult = 0.3;
    if (i >= 2 && i <= 4) mult = 0.90; // Next morning peak
    else if (i >= 7 && i <= 9) mult = 0.80; // Next evening
    const predictedCount = Math.round(locationCapacity * mult * (0.9 + Math.random() * 0.15));
    forecast.push({
      time: h,
      predictedCount: predictedCount,
      riskLevel: predictedCount / locationCapacity > 0.85 ? 'High' : (predictedCount / locationCapacity > 0.6 ? 'Moderate' : 'Low'),
      capacityPct: Math.round((predictedCount / locationCapacity) * 100),
      isHistorical: false
    });
  });

  return { history, forecast };
};
