// FlowSense AI - API Key Configuration & Connection Modal

function ApiKeyModal({ isOpen, onClose }) {
  const [apiKeyInput, setApiKeyInput] = React.useState('');
  const [showKey, setShowKey] = React.useState(false);
  const [status, setStatus] = React.useState({ type: 'idle', message: '' }); // idle | testing | success | error
  const [hasKey, setHasKey] = React.useState(false);

  React.useEffect(() => {
    if (isOpen && window.GeminiService) {
      const existingKey = window.GeminiService.getApiKey();
      setApiKeyInput(existingKey);
      setHasKey(window.GeminiService.hasValidKey());
      setStatus({ type: 'idle', message: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveAndConnect = async (e) => {
    e.preventDefault();
    if (!apiKeyInput.trim()) {
      setStatus({ type: 'error', message: 'Please enter a valid Gemini API Key.' });
      return;
    }

    setStatus({ type: 'testing', message: 'Verifying API Key connection with Google Gemini AI...' });
    
    try {
      await window.GeminiService.testApiKey(apiKeyInput.trim());
      window.GeminiService.setApiKey(apiKeyInput.trim());
      setHasKey(true);
      setStatus({ type: 'success', message: '🎉 Successfully connected to Google Gemini AI API!' });
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      // Even if offline/invalid, allow saving option or show error
      setStatus({ type: 'error', message: err.message || 'Failed to connect. Please verify your API Key.' });
    }
  };

  const handleClearKey = () => {
    window.GeminiService.setApiKey('');
    setApiKeyInput('');
    setHasKey(false);
    setStatus({ type: 'idle', message: 'API key cleared.' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <i data-lucide="x" className="w-5 h-5"></i>
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-2xl text-white shadow-lg glow-blue">
            <i data-lucide="key" className="w-6 h-6"></i>
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-xl text-white">Connect Google Gemini API</h2>
            <p className="text-xs text-slate-400">Power real-time AI crowd predictions & vision safety analytics</p>
          </div>
        </div>

        {/* Current Connection Status Badge */}
        <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
          hasKey 
            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
            : 'bg-amber-950/70 border-amber-500/40 text-amber-300'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${hasKey ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="font-semibold">
              {hasKey ? 'Gemini AI API Connected & Ready' : 'Gemini AI Key Not Connected'}
            </span>
          </div>
          <span className="text-[10px] font-mono opacity-80">Model: gemini-2.0-flash</span>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSaveAndConnect} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Google Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-brand-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-white"
              >
                <i data-lucide={showKey ? 'eye-off' : 'eye'} className="w-4 h-4"></i>
              </button>
            </div>
          </div>

          {/* Feedback Message Alert */}
          {status.message && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              status.type === 'testing' ? 'bg-brand-950 border border-brand-500/40 text-brand-300' :
              status.type === 'success' ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300' :
              status.type === 'error' ? 'bg-rose-950 border border-rose-500/40 text-rose-300' :
              'bg-slate-800 text-slate-300'
            }`}>
              {status.type === 'testing' && <i data-lucide="loader-2" className="w-4 h-4 animate-spin"></i>}
              {status.type === 'success' && <i data-lucide="check-circle-2" className="w-4 h-4 text-emerald-400"></i>}
              {status.type === 'error' && <i data-lucide="alert-circle" className="w-4 h-4 text-rose-400"></i>}
              <span>{status.message}</span>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={status.type === 'testing'}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg glow-blue flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <i data-lucide="zap" className="w-4 h-4"></i>
              <span>{status.type === 'testing' ? 'Connecting...' : 'Save & Connect API Key'}</span>
            </button>

            {hasKey && (
              <button
                type="button"
                onClick={handleClearKey}
                className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Disconnect
              </button>
            )}
          </div>
        </form>

        {/* How to get API Key Instructions Box */}
        <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
          <h4 className="font-bold text-slate-200 flex items-center gap-1.5">
            <i data-lucide="sparkles" className="w-4 h-4 text-saffron-400"></i>
            <span>How to get a FREE Gemini API Key in 30 seconds:</span>
          </h4>
          <ol className="list-decimal list-inside text-slate-400 space-y-1 text-[11px] leading-relaxed">
            <li>Open <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-brand-400 underline font-semibold hover:text-brand-300">Google AI Studio (aistudio.google.com)</a></li>
            <li>Sign in with your Google account.</li>
            <li>Click <strong>"Create API Key"</strong>.</li>
            <li>Copy the key string starting with <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">AIzaSy...</code> and paste it above!</li>
          </ol>
        </div>

      </div>
    </div>
  );
}

window.ApiKeyModal = ApiKeyModal;
