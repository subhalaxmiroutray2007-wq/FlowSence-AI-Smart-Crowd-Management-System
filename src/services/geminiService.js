// FlowSense AI - Google Gemini API Integration Service

(function() {
  const getApiKey = () => {
    return localStorage.getItem('FLOWSENSE_GEMINI_API_KEY') || 
           (window.FLOWSENSE_CONFIG && window.FLOWSENSE_CONFIG.GEMINI_API_KEY) || 
           '';
  };

  const setApiKey = (key) => {
    const trimmed = (key || '').trim();
    localStorage.setItem('FLOWSENSE_GEMINI_API_KEY', trimmed);
    if (window.FLOWSENSE_CONFIG) {
      window.FLOWSENSE_CONFIG.GEMINI_API_KEY = trimmed;
    }
    return trimmed;
  };

  const hasValidKey = () => {
    const key = getApiKey();
    return Boolean(key && key.length > 10);
  };

  // Generic call to Gemini REST API
  const callGeminiAPI = async (prompt, systemInstruction = '') => {
    const key = getApiKey();
    if (!key) {
      throw new Error('Gemini API Key is missing. Please add your key in the API Key settings modal.');
    }

    const model = (window.FLOWSENSE_CONFIG && window.FLOWSENSE_CONFIG.GEMINI_MODEL) || 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;

    const contents = [];
    if (systemInstruction) {
      contents.push({
        role: 'user',
        parts: [{ text: `SYSTEM INSTRUCTION: ${systemInstruction}` }]
      });
      contents.push({
        role: 'model',
        parts: [{ text: 'Understood. I will act strictly according to these crowd safety guidelines.' }]
      });
    }

    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1000
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Gemini API Error: ${msg}`);
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) {
      throw new Error('Received empty response from Gemini API.');
    }

    return replyText;
  };

  // Test API Key connection
  const testApiKey = async (keyToTest) => {
    const model = (window.FLOWSENSE_CONFIG && window.FLOWSENSE_CONFIG.GEMINI_MODEL) || 'gemini-2.0-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${keyToTest}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Respond with "OK" if connected.' }] }]
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || 'Invalid API Key or network issue.');
    }

    return true;
  };

  // Analyze specific location crowd & generate safety predictions
  const analyzeCrowdLocation = async (location) => {
    const occupancyPct = Math.round((location.currentCount / location.capacity) * 100);
    const systemPrompt = `You are FlowSense AI — an expert AI Crowd Safety & Queue Optimization Engine for public venues in India. Provide concise, high-impact structured recommendations in clean Markdown format with headers and bullet points.`;
    
    const userPrompt = `Analyze the current live telemetry for venue:
- Name: ${location.name} (${location.city})
- Category: ${location.category}
- Live Headcount: ${location.currentCount} / Capacity: ${location.capacity} (${occupancyPct}% Occupancy)
- Current Status: ${location.status} (Safety Threshold: ${location.safetyThreshold}%)
- Avg Wait Time: ${location.avgWaitMinutes} mins
- Active Open Counters: ${location.counters.map(c => c.name).join(', ')}

Please provide:
1. 🚨 **Current Safety & Density Risk Level** (Low / Moderate / High / Critical with short rationale)
2. 💡 **Optimal Visitor Recommendation Window** (When citizens should visit today)
3. ⚡ **Immediate Operator Action Items** (2-3 operational steps for gate managers, e.g. throttle entrance, open emergency gate 2, dispatch crowd safety unit)
4. 🔮 **4-Hour Forward Prediction** (Expected trend and risk warning)`;

    return await callGeminiAPI(userPrompt, systemPrompt);
  };

  // Analyze camera feed stream
  const analyzeCameraFeed = async (feed) => {
    const systemPrompt = `You are FlowSense AI Optical Vision Analyst. Analyze CCTV sensor metrics and provide real-time crowd behavior diagnosis.`;
    const userPrompt = `CCTV Stream Analysis:
- Feed Name: ${feed.name}
- Location: ${feed.locationName}
- Detected Person Count: ${feed.detectedCount}
- Density Score: ${feed.densityScore}/100
- Feed Status: ${feed.status}

Provide:
1. 🎯 **Density & Flow Vector Analysis**
2. ⚠️ **Stampede / Bottleneck Risk Flag**
3. 🛡️ **Tactical Intervention Action**`;

    return await callGeminiAPI(userPrompt, systemPrompt);
  };

  // Chat with Gemini AI Assistant
  const chatWithAssistant = async (userMessage, chatHistory = []) => {
    const systemPrompt = `You are FlowSense AI Assistant — a helpful, intelligent crowd control and virtual queuing companion. You assist visitors, commuters, pilgrims, and facility administrators with crowd updates, ticket advice, safety tips, and travel window recommendations. Be warm, accurate, and concise.`;
    
    const formattedHistory = chatHistory.map(item => `${item.role === 'user' ? 'User' : 'Assistant'}: ${item.text}`).join('\n');
    const fullPrompt = `${formattedHistory ? 'Previous Chat Context:\n' + formattedHistory + '\n\n' : ''}User Question: ${userMessage}`;

    return await callGeminiAPI(fullPrompt, systemPrompt);
  };

  window.GeminiService = {
    getApiKey,
    setApiKey,
    hasValidKey,
    testApiKey,
    analyzeCrowdLocation,
    analyzeCameraFeed,
    chatWithAssistant
  };

})();
