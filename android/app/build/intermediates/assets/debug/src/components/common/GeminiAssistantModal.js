// FlowSense AI - Interactive Gemini AI Safety & Crowd Assistant Modal

function GeminiAssistantModal({ isOpen, onClose }) {
  const [messages, setMessages] = React.useState([
    {
      role: 'assistant',
      text: 'Namaste! I am **FlowSense AI Assistant** powered by Google Gemini. Ask me about live crowd conditions in Tirupati, Dadar, Rajiv Chowk, virtual queue booking, optimal visit windows, or venue safety rules!'
    }
  ]);
  const [inputText, setInputText] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    const query = inputText.trim();
    if (!query || isLoading) return;

    const userMsg = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      if (window.GeminiService && window.GeminiService.hasValidKey()) {
        const reply = await window.GeminiService.chatWithAssistant(query, messages);
        setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
      } else {
        // Fallback intelligent simulation reply if no key added yet
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'assistant',
            text: `(Demo Mode) I processed your query regarding "${query}". For live real-time AI responses, please connect your **Google Gemini API Key** via the key icon in the navigation header!`
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: `⚠️ Error calling Gemini API: ${err.message}. Please check your API key.`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "What is the best time to visit Tirupati Balaji today?",
    "How does the virtual queue pass work?",
    "What should venue safety officers do during High Density alerts?",
    "Check crowd level at Dadar Central Station"
  ];

  const [isListening, setIsListening] = React.useState(false);

  const handleVoiceInput = () => {
    if (window.HapticsService) window.HapticsService.lightTap();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice dictation is supported on modern mobile browsers (Chrome, Safari, Edge). Please type your message.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(prev => (prev ? prev + ' ' + transcript : transcript));
        }
      };
      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-slate-900 border-t sm:border border-slate-800 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] sm:h-[620px]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-lg glow-blue">
              <i data-lucide="sparkles" className="w-5 h-5"></i>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-base text-white flex items-center gap-2">
                <span>FlowSense Gemini AI Assistant</span>
                <span className="bg-brand-950 text-brand-300 border border-brand-500/30 text-[10px] px-2 py-0.5 rounded font-mono">LIVE AI</span>
              </h3>
              <p className="text-xs text-slate-400">Ask safety protocols, queue updates, or visit time recommendations</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <i data-lucide="x" className="w-5 h-5"></i>
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                msg.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-800 text-saffron-400 border border-slate-700'
              }`}>
                {msg.role === 'user' ? 'YOU' : 'AI'}
              </div>

              <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-none' 
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none space-y-2'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-saffron-400 border border-slate-700 flex items-center justify-center text-xs font-bold">
                AI
              </div>
              <div className="bg-slate-950 border border-slate-800 px-4 py-3 rounded-2xl text-xs text-slate-400 flex items-center gap-2">
                <i data-lucide="loader-2" className="w-4 h-4 animate-spin text-brand-400"></i>
                <span>Gemini AI is analyzing crowd model...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length <= 2 && (
          <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider shrink-0">Try asking:</span>
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                onClick={() => { setInputText(p); }}
                className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-slate-700"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar with Mobile Voice Dictation */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2.5 rounded-xl border text-xs transition ${
              isListening
                ? 'bg-rose-600 border-rose-400 text-white animate-pulse'
                : 'bg-slate-900 border-slate-700/80 text-slate-400 hover:text-white'
            }`}
            title="Voice query dictation (Web Speech API)"
          >
            <i data-lucide={isListening ? 'mic-off' : 'mic'} className="w-4 h-4"></i>
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isListening ? "Listening... Speak your prompt..." : "Ask Gemini AI about crowd safety or queue updates..."}
            className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />

          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 disabled:opacity-50"
          >
            <i data-lucide="send" className="w-4 h-4"></i>
            <span className="hidden sm:inline">Ask AI</span>
          </button>
        </form>

      </div>
    </div>
  );
}

window.GeminiAssistantModal = GeminiAssistantModal;
