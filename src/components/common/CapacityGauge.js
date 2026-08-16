// FlowSense AI - Capacity Gauge Component

function CapacityGauge({ current, capacity, safetyThreshold = 85, showLabel = true }) {
  const percentage = Math.min(100, Math.round((current / capacity) * 100));
  
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-400';
  
  if (percentage >= 85) {
    barColor = 'bg-rose-500';
    textColor = 'text-rose-400';
  } else if (percentage >= 70) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-400';
  } else if (percentage >= 45) {
    barColor = 'bg-blue-500';
    textColor = 'text-blue-400';
  }

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <span className="text-slate-400 flex items-center gap-1">
            <span>Occupancy</span>
            <span className="text-slate-500">({current.toLocaleString()} / {capacity.toLocaleString()})</span>
          </span>
          <span className={`${textColor} font-semibold font-heading text-sm`}>
            {percentage}%
          </span>
        </div>
      )}
      
      {/* Progress Track */}
      <div className="relative w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50">
        {/* Safety Limit Indicator line */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-rose-500/60 z-10" 
          style={{ left: `${safetyThreshold}%` }}
          title={`Safety Threshold (${safetyThreshold}%)`}
        />
        
        {/* Animated Filled Bar */}
        <div 
          className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {showLabel && percentage >= safetyThreshold && (
        <div className="flex items-center gap-1 mt-1 text-[11px] text-rose-400 font-medium animate-pulse">
          <span>⚠️ Exceeding Safety Threshold ({safetyThreshold}%)</span>
        </div>
      )}
    </div>
  );
}

window.CapacityGauge = CapacityGauge;
