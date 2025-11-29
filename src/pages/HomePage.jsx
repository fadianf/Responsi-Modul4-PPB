import { useState, useEffect } from 'react';
import { CheckSquare, BookOpen, TrendingUp, Plus } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useJournals } from '../hooks/useJournals';
import { getUserIdentifier, formatRelativeTime } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function HomePage({ onNavigate }) {
  const [greeting, setGreeting] = useState('');
  const { todos, loading: todosLoading } = useTodos({ limit: 5 });
  const { journals, loading: journalsLoading } = useJournals({ limit: 3 });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Selamat Pagi');
    else if (hour < 18) setGreeting('Selamat Siang');
    else setGreeting('Selamat Malam');
  }, []);

  const activeTodos = todos.filter(todo => !todo.is_completed);
  const completedTodos = todos.filter(todo => todo.is_completed);
  const completionRate = todos.length > 0 
    ? Math.round((completedTodos.length / todos.length) * 100) 
    : 0;

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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{activeTodos.length}</p>
            <p className="text-xs text-slate-500">Active Tasks</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{journals.length}</p>
            <p className="text-xs text-slate-500">Journals</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{completionRate}%</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('todos', 'create')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <Plus className="w-6 h-6 mb-2" />
              <p className="font-semibold">New Task</p>
            </button>
            <button
              onClick={() => onNavigate('journal', 'create')}
              className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <Plus className="w-6 h-6 mb-2" />
              <p className="font-semibold">New Journal</p>
            </button>
          </div>
        </div>

        {/* Recent Todos */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-slate-800">Recent Tasks</h2>
            <button
              onClick={() => onNavigate('todos')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              View All →
            </button>
          </div>
          
          {todosLoading ? (
            <LoadingSpinner size="sm" text="" />
          ) : activeTodos.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/50">
              <p className="text-slate-500">No active tasks</p>
            </div>
          ) : (
            <div className="space-y-2">
              {activeTodos.slice(0, 3).map(todo => (
                <div
                  key={todo.id}
                  onClick={() => onNavigate('todos', 'detail', todo.id)}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-white/50 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 rounded border-2 border-slate-300"></div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 line-clamp-1">{todo.title}</p>
                      {todo.due_date && (
                        <p className="text-xs text-slate-500 mt-1">
                          Due: {new Date(todo.due_date).toLocaleDateString('id-ID')}
                        </p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      todo.priority === 'high' ? 'bg-red-100 text-red-700' :
                      todo.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {todo.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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