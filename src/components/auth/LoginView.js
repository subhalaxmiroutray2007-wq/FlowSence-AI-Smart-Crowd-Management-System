// FlowSense AI - Authentication & Login Section

function LoginView() {
  const {
    setCurrentView,
    loginUser,
    goBack,
    currentUser
  } = React.useContext(window.CrowdContext);

  const [authMode, setAuthMode] = React.useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = React.useState('citizen'); // 'citizen' | 'admin' | 'kiosk'
  
  // Form State
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [successMsg, setSuccessMsg] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Initialize Lucide icons on render
  React.useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [authMode, selectedRole, errorMsg, successMsg]);

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password || (authMode === 'register' && !fullName)) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const userName = authMode === 'register' 
        ? fullName 
        : email.split('@')[0].replace('.', ' ').replace(/^./, str => str.toUpperCase()) || 'User';

      const user = loginUser({
        email: email,
        name: userName,
        role: selectedRole,
        remember: rememberMe
      });

      setSuccessMsg(`Welcome back, ${user.name}! Redirecting to ${selectedRole.toUpperCase()} section...`);

      setTimeout(() => {
        if (selectedRole === 'admin') setCurrentView('admin');
        else if (selectedRole === 'kiosk') setCurrentView('kiosk');
        else setCurrentView('citizen');
      }, 1000);
    }, 600);
  };

  // Quick Demo Login Handler
  const handleQuickDemo = (role) => {
    setIsLoading(true);
    setErrorMsg('');
    
    let demoUser = {
      role: role,
      remember: true
    };

    if (role === 'admin') {
      demoUser.email = 'admin@flowsense.ai';
      demoUser.name = 'Cmdr. Rajesh Sharma';
      demoUser.title = 'Chief Operations Director';
    } else if (role === 'kiosk') {
      demoUser.email = 'security.gate1@flowsense.ai';
      demoUser.name = 'Officer Amit Kumar';
      demoUser.title = 'Senior Gate Security Officer';
    } else {
      demoUser.email = 'citizen.subha@gmail.com';
      demoUser.name = 'Subhashree Routray';
      demoUser.title = 'Verified Citizen / Pilgrim';
    }

    setTimeout(() => {
      setIsLoading(false);
      const user = loginUser(demoUser);
      setSuccessMsg(`Signed in as ${user.name} (${user.role.toUpperCase()})`);

      setTimeout(() => {
        if (role === 'admin') setCurrentView('admin');
        else if (role === 'kiosk') setCurrentView('kiosk');
        else setCurrentView('citizen');
      }, 800);
    }, 400);
  };

  const roles = [
    {
      id: 'citizen',
      title: 'Citizen / Pilgrim',
      desc: 'Browse spaces, book remote virtual tokens, check live crowd density',
      icon: 'users',
      badge: 'Public Access',
      badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    },
    {
      id: 'admin',
      title: 'Admin Operator',
      desc: 'Full command center, CCTV heatmaps, incident dispatch, venue fleet',
      icon: 'shield-alert',
      badge: 'Command Access',
      badgeStyle: 'bg-brand-500/20 text-brand-300 border-brand-500/30'
    },
    {
      id: 'kiosk',
      title: 'Gate Security',
      desc: 'Token QR scanner kiosk, gate entry verification, live headcount updates',
      icon: 'qr-code',
      badge: 'Gate Kiosk',
      badgeStyle: 'bg-saffron-500/20 text-saffron-300 border-saffron-500/30'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 space-y-8 animate-fade-in">
      
      {/* Top Header Navigation Bar & Title */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white text-xs font-semibold shadow-md transition-all group"
        >
          <i data-lucide="arrow-left" className="w-4 h-4 text-brand-400 group-hover:-translate-x-1 transition-transform"></i>
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <i data-lucide="shield-check" className="w-4 h-4 text-emerald-400"></i>
          <span className="font-mono">FlowSense Auth v2.4</span>
        </div>
      </div>

      {/* Already Logged In Banner */}
      {currentUser && (
        <div className="glass-card p-5 rounded-2xl border border-brand-500/40 bg-gradient-to-r from-brand-950/80 via-slate-900 to-indigo-950/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white font-extrabold font-heading text-lg flex items-center justify-center shadow-lg glow-blue">
              {currentUser.avatar || currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white">{currentUser.name}</h3>
                <span className="bg-brand-500/20 text-brand-300 text-[10px] font-bold px-2 py-0.5 rounded border border-brand-500/30 uppercase tracking-wider">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-slate-300">{currentUser.email || currentUser.title || 'Logged in active session'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView(currentUser.role === 'admin' ? 'admin' : currentUser.role === 'kiosk' ? 'kiosk' : 'citizen')}
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
            >
              <span>Go to Dashboard</span>
              <i data-lucide="arrow-right" className="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      )}

      {/* Main Authentication Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Quick Demo Presets & Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-[11px] font-semibold mb-3">
                <i data-lucide="sparkles" className="w-3.5 h-3.5 text-saffron-400"></i>
                <span>Instant Evaluator Access</span>
              </div>
              <h2 className="text-2xl font-extrabold font-heading text-white">One-Click Demo Logins</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Experience FlowSense AI with pre-configured role credentials for instant testing.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="w-full p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-brand-500/60 transition-all text-left flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center border border-brand-500/30">
                    <i data-lucide="shield-alert" className="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-brand-300 transition">Cmdr. Rajesh Sharma</h4>
                    <p className="text-[11px] text-slate-400">Admin Command Director</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-brand-500/20 text-brand-300 px-2 py-1 rounded border border-brand-500/30">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('kiosk')}
                className="w-full p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-saffron-500/60 transition-all text-left flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-300 flex items-center justify-center border border-saffron-500/30">
                    <i data-lucide="qr-code" className="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-saffron-300 transition">Officer Amit Kumar</h4>
                    <p className="text-[11px] text-slate-400">Gate 1 Entry Kiosk Guard</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-saffron-500/20 text-saffron-300 px-2 py-1 rounded border border-saffron-500/30">Security</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('citizen')}
                className="w-full p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/60 transition-all text-left flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
                    <i data-lucide="users" className="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition">Subhashree Routray</h4>
                    <p className="text-[11px] text-slate-400">Verified Citizen / Pilgrim</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30">Citizen</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <i data-lucide="lock" className="w-3.5 h-3.5 text-emerald-400"></i>
                <span>256-Bit Encrypted Virtual Pass Tokenization</span>
              </div>
              <div className="flex items-center gap-2">
                <i data-lucide="activity" className="w-3.5 h-3.5 text-brand-400"></i>
                <span>Seamless syncing across Web and Capacitor Mobile App</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Auth Form Card */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 shadow-2xl">
            
            {/* Form Mode Toggle Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold font-heading text-white">
                  {authMode === 'login' ? 'Sign In to FlowSense' : 'Register New Account'}
                </h3>
                <p className="text-xs text-slate-400">Access crowd safety tools and queue management</p>
              </div>

              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${authMode === 'login' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${authMode === 'register' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Role Selection Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 block">Select Account Role</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRole(r.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${selectedRole === r.id ? 'bg-brand-950/70 border-brand-500 text-white ring-2 ring-brand-500/40 shadow-lg' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'}`}
                  >
                    <div className="flex items-center justify-between">
                      <i data-lucide={r.icon} className={`w-4 h-4 ${selectedRole === r.id ? 'text-brand-400' : 'text-slate-400'}`}></i>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${r.badgeStyle}`}>{r.id.toUpperCase()}</span>
                    </div>
                    <p className="text-xs font-bold font-heading line-clamp-1">{r.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Alert / Feedback Messages */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-shake">
                <i data-lucide="alert-circle" className="w-4 h-4 text-rose-400 shrink-0"></i>
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-pulse">
                <i data-lucide="check-circle-2" className="w-4 h-4 text-emerald-400 shrink-0"></i>
                <span>{successMsg}</span>
              </div>
            )}

            {/* Auth Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {authMode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Full Name</label>
                  <div className="relative">
                    <i data-lucide="user" className="w-4 h-4 absolute left-3.5 top-3 text-slate-400"></i>
                    <input
                      type="text"
                      placeholder="e.g. Subhashree Routray"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
                      required={authMode === 'register'}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Email or Mobile Number</label>
                <div className="relative">
                  <i data-lucide="mail" className="w-4 h-4 absolute left-3.5 top-3 text-slate-400"></i>
                  <input
                    type="text"
                    placeholder="name@example.com or +91 9876543210"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={() => alert('Password reset instructions have been dispatched to your email.')}
                      className="text-[11px] text-brand-400 hover:text-brand-300 font-medium"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <i data-lucide="lock" className="w-4 h-4 absolute left-3.5 top-3 text-slate-400"></i>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
                  >
                    <i data-lucide={showPassword ? 'eye-off' : 'eye'} className="w-4 h-4"></i>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-900 border-slate-700 text-brand-600 focus:ring-brand-500 h-4 w-4"
                  />
                  <span>Keep me logged in on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-semibold text-xs shadow-lg glow-blue flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <i data-lucide="loader" className="w-4 h-4 animate-spin"></i>
                    <span>Authenticating Credentials...</span>
                  </>
                ) : (
                  <>
                    <i data-lucide={authMode === 'login' ? 'log-in' : 'user-plus'} className="w-4 h-4"></i>
                    <span>{authMode === 'login' ? `Sign In as ${selectedRole.toUpperCase()}` : 'Create Account & Continue'}</span>
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>

    </div>
  );
}

window.LoginView = LoginView;
