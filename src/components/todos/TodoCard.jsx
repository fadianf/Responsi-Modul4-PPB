import { Check, Clock, Flag } from 'lucide-react';
import { getPriorityColor, formatDate } from '../../utils/helpers';

export default function TodoCard({ todo, onClick, onToggle }) {
  const handleToggle = (e) => {
    e.stopPropagation();
    onToggle(todo.id);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`w-6 h-6 mt-0.5 rounded-lg border-2 flex items-center justify-center transition-all ${
            todo.is_completed
              ? 'bg-green-500 border-green-500'
              : 'border-slate-300 hover:border-purple-400'
          }`}
        >
          {todo.is_completed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-slate-800 mb-1 ${
            todo.is_completed ? 'line-through text-slate-400' : ''
          }`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className={`text-sm text-slate-600 mb-2 line-clamp-2 ${
              todo.is_completed ? 'text-slate-400' : ''
            }`}>
              {todo.description}
            </p>
          )}

          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(todo.priority)}`}>
              <Flag className="w-3 h-3 inline mr-1" />
              {todo.priority}
            </span>
            
            {todo.due_date && (
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                <Clock className="w-3 h-3 inline mr-1" />
                {formatDate(todo.due_date)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}