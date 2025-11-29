export default function ActivityChart({ data = [], max = 1 }) {
  if (!data.length) return null;
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div className="flex items-center gap-3" key={d.date}>
          <div className="w-12 text-center">
            <p className="text-xs font-medium text-slate-500">{new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <p className="text-sm font-bold text-slate-800">{new Date(d.date).getDate()}</p>
          </div>
          <div className="flex-1">
            <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden relative">
              {d.total > 0 && (
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-end px-3"
                  style={{ width: `${(d.total / max) * 100}%` }}
                >
                  <span className="text-xs font-bold text-white">{d.total}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
