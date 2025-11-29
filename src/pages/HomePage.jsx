import { useState, useEffect } from 'react';
import { CheckSquare, BookOpen, TrendingUp } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useJournals } from '../hooks/useJournals';
import { useStatistics } from '../hooks/useStatistics';
import { formatRelativeTime } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';
import QuickActions from '../components/home/QuickActions';
import StatsCard from '../components/home/StatsCard';
import RecentActivity from '../components/home/RecentActivity';

export default function HomePage({ onNavigate }) {
  const [greeting, setGreeting] = useState('');
  const { todos, loading: todosLoading } = useTodos({ limit: 5 });
  const { journals, loading: journalsLoading } = useJournals({ limit: 3 });
  const {
    loading: statsLoading,
    activeTodos: statActiveTodos,
    completedTodos: statCompletedTodos,
    completionRate,
    totalJournals: statTotalJournals,
  } = useStatistics();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi');
    else if (hour < 18) setGreeting('Selamat Siang');
    else setGreeting('Selamat Malam');
  }, []);

  // Active/completion stats are derived via useStatistics (statActiveTodos, completionRate, etc.)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 px-6 pt-12 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">{greeting}! 👋</h1>
          <p className="text-purple-100">Mari produktif hari ini</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatsCard icon={CheckSquare} value={statActiveTodos} label="Active Tasks" />
          <StatsCard icon={BookOpen} value={statTotalJournals} label="Journals" />
          <StatsCard icon={TrendingUp} value={`${completionRate}%`} label="Completed" />
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Quick Actions</h2>
          <QuickActions
            onCreateTask={() => onNavigate('todos', 'create')}
            onCreateJournal={() => onNavigate('journal', 'create')}
          />
        </div>

        {/* Recent Activity (todos + journals) */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <button
              onClick={() => onNavigate('todos')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View All →
            </button>
          </div>
          
          {todosLoading || journalsLoading ? (
            <LoadingSpinner size="sm" text="" />
          ) : (!todos.length && !journals.length) ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50">
              <p className="text-slate-500">No active tasks</p>
            </div>
          ) : (
            <RecentActivity
              todos={todos}
              journals={journals}
              onItemClick={(item) => {
                if (item.type === 'todo') onNavigate('todos', 'detail', item.id);
                else onNavigate('journal', 'detail', item.id);
              }}
            />
          )}
        </div>

        {/* Recent Journals */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800">Recent Journals</h2>
            <button
              onClick={() => onNavigate('journal')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View All →
            </button>
          </div>
          
          {journalsLoading ? (
            <LoadingSpinner size="sm" text="" />
          ) : journals.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50">
              <p className="text-slate-500">No journals yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {journals.slice(0, 2).map(journal => (
                <div
                  key={journal.id}
                  onClick={() => onNavigate('journal', 'detail', journal.id)}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-slate-800 line-clamp-1">{journal.title}</h3>
                    <span className="text-2xl">{journal.mood === 'happy' ? '😊' : journal.mood === 'sad' ? '😢' : '😐'}</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-2">{journal.content}</p>
                  <p className="text-xs text-slate-400">{formatRelativeTime(journal.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}