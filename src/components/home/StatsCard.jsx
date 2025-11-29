export default function StatsCard({ icon: Icon, value, label, subtitle }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
      <div className="flex items-center justify-between mb-2">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-purple-600" />}
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500">{label}{subtitle && ` • ${subtitle}`}</p>
    </div>
  );
}
