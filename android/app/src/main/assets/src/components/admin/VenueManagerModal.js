// FlowSense AI - Venue Manager Add/Edit Modal

function VenueManagerModal({ onClose }) {
  const { addLocation } = React.useContext(window.CrowdContext);

  const [name, setName] = React.useState('');
  const [city, setCity] = React.useState('Mumbai');
  const [state, setState] = React.useState('Maharashtra');
  const [category, setCategory] = React.useState('Temples & Festivals');
  const [capacity, setCapacity] = React.useState(10000);
  const [currentCount, setCurrentCount] = React.useState(1200);
  const [safetyThreshold, setSafetyThreshold] = React.useState(85);
  const [image, setImage] = React.useState('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80');
  const [description, setDescription] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    addLocation({
      name,
      shortName: name.substring(0, 18),
      city,
      state,
      category,
      capacity: parseInt(capacity, 10),
      currentCount: parseInt(currentCount, 10),
      safetyThreshold: parseInt(safetyThreshold, 10),
      image,
      description
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6 my-8">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] text-brand-400 font-bold uppercase tracking-wider">Fleet Configuration</span>
            <h2 className="font-heading font-extrabold text-xl text-white">Add New Public Space</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white">
            <i data-lucide="x" className="w-5 h-5"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Venue Full Name *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. Siddhivinayak Temple Concourse"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">City</label>
              <input 
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">State</label>
              <input 
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            >
              <option value="Temples & Festivals">Temples & Festivals</option>
              <option value="Train Stations">Train Stations</option>
              <option value="Metro Stations">Metro Stations</option>
              <option value="Government Offices">Government Offices</option>
              <option value="Stadiums & Events">Stadiums & Events</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Max Capacity</label>
              <input 
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Initial Headcount</label>
              <input 
                type="number"
                value={currentCount}
                onChange={(e) => setCurrentCount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Safety Threshold %</label>
              <input 
                type="number"
                value={safetyThreshold}
                onChange={(e) => setSafetyThreshold(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Image Cover URL</label>
            <input 
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Description</label>
            <textarea 
              rows="2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of facility..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-semibold shadow-lg glow-blue"
            >
              Add Venue to System
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

window.VenueManagerModal = VenueManagerModal;
