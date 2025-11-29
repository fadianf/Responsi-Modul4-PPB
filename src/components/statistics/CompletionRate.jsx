export default function CompletionRate({ completed, total }) {
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">Completed</span>
        <span className="text-sm font-bold text-green-600">{completed} / {total}</span>
      </div>
      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
          style={{ width: `${rate}%` }}
        ></div>
      </div>
    </div>
  );
}
