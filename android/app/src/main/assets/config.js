// FlowSense AI - Configuration & API Key Settings

window.FLOWSENSE_CONFIG = {
  // Google Gemini AI API Key
  // Get your free API key from Google AI Studio: https://aistudio.google.com/app/apikey
  GEMINI_API_KEY: localStorage.getItem('FLOWSENSE_GEMINI_API_KEY') || '',
  
  // Default AI Model selection
  GEMINI_MODEL: 'gemini-2.0-flash', // fallback: gemini-1.5-flash
  
  // API Endpoint
  GEMINI_API_BASE: 'https://generativelanguage.googleapis.com/v1beta/models'
};
