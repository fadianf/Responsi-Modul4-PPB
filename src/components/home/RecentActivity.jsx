import { formatRelativeTime } from '../../utils/helpers';

export default function RecentActivity({ todos = [], journals = [], limit = 5, onItemClick = () => {} }) {
  const activities = [
    ...todos.map(t => ({ type: 'todo', id: t.id, title: t.title, created_at: t.created_at })),
    ...journals.map(j => ({ type: 'journal', id: j.id, title: j.title, created_at: j.created_at }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, limit);

  return (
    <div className="space-y-2">
      {activities.map(a => (
        <div key={`${a.type}-${a.id}`} onClick={() => onItemClick(a)} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-md border border-white/50 hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-slate-800 text-sm">{a.title}</h3>
            <span className="text-xs text-slate-400">{formatRelativeTime(a.created_at)}</span>
          </div>
          <div className="text-xs text-slate-500">{a.type === 'todo' ? 'Task' : 'Journal'}</div>
        </div>
      ))}
    </div>
  );
}
