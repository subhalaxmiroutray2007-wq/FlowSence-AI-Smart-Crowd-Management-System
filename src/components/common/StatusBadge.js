// FlowSense AI - Status Badge Component

function StatusBadge({ status, showPulse = true, size = 'md' }) {
  let badgeStyle = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
  let dotStyle = 'bg-emerald-400';
  let label = 'Low Crowd';
  let pulseGlow = '';

  if (status === 'Moderate') {
    badgeStyle = 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    dotStyle = 'bg-blue-400';
    label = 'Moderate';
  } else if (status === 'High') {
    badgeStyle = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    dotStyle = 'bg-amber-400';
    label = 'High Crowd';
  } else if (status === 'Critical') {
    badgeStyle = 'bg-rose-500/10 text-rose-400 border-rose-500/40 glow-red';
    dotStyle = 'bg-rose-500';
    label = 'Critical Density';
    if (showPulse) pulseGlow = 'animate-pulse';
  }

  const paddingStyle = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3.5 py-1.5 text-sm font-semibold' : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full ${paddingStyle} ${badgeStyle} ${pulseGlow}`}>
      <span className="relative flex h-2 w-2">
        {showPulse && (status === 'Critical' || status === 'High') && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotStyle}`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotStyle}`}></span>
      </span>
      <span>{label}</span>
    </span>
  );
}

window.StatusBadge = StatusBadge;
