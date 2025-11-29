import { BookOpen, Lock } from 'lucide-react';
import { formatRelativeTime, truncateText, getMoodColor } from '../../utils/helpers';
import { MOODS } from '../../utils/constants';

export default function JournalCard({ journal, onClick }) {
  const mood = MOODS.find(m => m.value === journal.mood);

  return (
    <div
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-white/50 hover:shadow-lg transition-all cursor-pointer"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${mood?.color}20` }}
          >
            {mood?.emoji || '😐'}
          </div>
          <div>
            <h3 className="font-bold text-slate-800 line-clamp-1">{journal.title}</h3>
            <p className="text-xs text-slate-500">{formatRelativeTime(journal.created_at)}</p>
          </div>
        </div>
        {journal.is_private && (
          <Lock className="w-4 h-4 text-slate-400" />
        )}
      </div>

      {/* Content Preview */}
      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-3">
        {truncateText(journal.content, 150)}
      </p>

      {/* Tags */}
      {journal.tags && journal.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {journal.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
            >
              #{tag}
            </span>
          ))}
          {journal.tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
              +{journal.tags.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}