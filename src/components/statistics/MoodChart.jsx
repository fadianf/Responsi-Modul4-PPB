export default function MoodChart({ distribution = [] }) {
  if (!distribution.length) return null;
  return (
    <div className="space-y-3">
      {distribution.map(m => (
        <div key={m.value}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-sm font-medium text-slate-700">{m.label}</span>
            </div>
            <span className="text-sm font-bold text-slate-800">{m.percentage}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${m.percentage}%`, backgroundColor: m.color }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
