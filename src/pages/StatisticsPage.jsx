import { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle, BookOpen, Target, Calendar } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useJournals } from '../hooks/useJournals';
import { MOODS } from '../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function StatisticsPage() {
  const { todos, loading: todosLoading } = useTodos();
  const { journals, loading: journalsLoading } = useJournals();
  const [timeRange, setTimeRange] = useState('week'); // week, month, all

  // Calculate statistics
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.is_completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const totalJournals = journals.length;

  // Mood distribution
  const moodDistribution = MOODS.map(mood => {
    const count = journals.filter(j => j.mood === mood.value).length;
    const percentage = totalJournals > 0 ? Math.round((count / totalJournals) * 100) : 0;
    return {
      ...mood,
      count,
      percentage
    };
  }).filter(m => m.count > 0);

  // Priority distribution
  const highPriority = todos.filter(t => t.priority === 'high' && !t.is_completed).length;
  const mediumPriority = todos.filter(t => t.priority === 'medium' && !t.is_completed).length;
  const lowPriority = todos.filter(t => t.priority === 'low' && !t.is_completed).length;

  // Recent activity (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const activityData = last7Days.map(date => {
    const todosOnDate = todos.filter(t => 
      t.created_at && t.created_at.split('T')[0] === date
    ).length;
    const journalsOnDate = journals.filter(j => 
      j.created_at && j.created_at.split('T')[0] === date
    ).length;
    
    return {
      date,
      todos: todosOnDate,
      journals: journalsOnDate,
      total: todosOnDate + journalsOnDate
    };
  });

  const maxActivity = Math.max(...activityData.map(d => d.total), 1);

  if (todosLoading || journalsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 px-6 pt-12 pb-8 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Statistics</h1>
          <p className="text-emerald-100">Your productivity insights</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{totalTodos}</p>
            <p className="text-xs text-slate-500">Total Tasks</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{completedTodos}</p>
            <p className="text-xs text-slate-500">Completed</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{totalJournals}</p>
            <p className="text-xs text-slate-500">Journals</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-slate-800">{completionRate}%</p>
            <p className="text-xs text-slate-500">Completion</p>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Task Completion Rate</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Completed</span>
                <span className="text-sm font-bold text-green-600">{completedTodos} / {totalTodos}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Active</span>
                <span className="text-sm font-bold text-purple-600">{activeTodos} tasks</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${100 - completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Active Tasks by Priority</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">High Priority</span>
              </div>
              <span className="text-lg font-bold text-slate-800">{highPriority}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">Medium Priority</span>
              </div>
              <span className="text-lg font-bold text-slate-800">{mediumPriority}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-700">Low Priority</span>
              </div>
              <span className="text-lg font-bold text-slate-800">{lowPriority}</span>
            </div>
          </div>
        </div>

        {/* Mood Distribution */}
        {moodDistribution.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Mood Distribution</h2>
            <div className="space-y-3">
              {moodDistribution.map(mood => (
                <div key={mood.value}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{mood.emoji}</span>
                      <span className="text-sm font-medium text-slate-700">{mood.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{mood.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${mood.percentage}%`,
                        backgroundColor: mood.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Activity Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            <Calendar className="w-5 h-5 inline mr-2" />
            Last 7 Days Activity
          </h2>
          <div className="space-y-3">
            {activityData.map((day, index) => {
              const date = new Date(day.date);
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayDate = date.getDate();
              
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 text-center">
                    <p className="text-xs font-medium text-slate-500">{dayName}</p>
                    <p className="text-sm font-bold text-slate-800">{dayDate}</p>
                  </div>
                  <div className="flex-1">
                    <div className="w-full h-8 bg-slate-100 rounded-lg overflow-hidden relative">
                      {day.total > 0 && (
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-end px-3 transition-all duration-500"
                          style={{ width: `${(day.total / maxActivity) * 100}%` }}
                        >
                          <span className="text-xs font-bold text-white">{day.total}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded"></div>
              <span className="text-slate-600">Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-500 rounded"></div>
              <span className="text-slate-600">Journals</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-6 border border-emerald-200">
          <h3 className="text-lg font-bold text-emerald-900 mb-3">📊 Summary</h3>
          <div className="space-y-2 text-sm text-emerald-800">
            <p>• You've completed <strong>{completedTodos}</strong> out of <strong>{totalTodos}</strong> tasks ({completionRate}%)</p>
            <p>• You have <strong>{activeTodos}</strong> active tasks remaining</p>
            <p>• You've written <strong>{totalJournals}</strong> journal entries</p>
            {moodDistribution.length > 0 && (
              <p>• Your most common mood is <strong>{moodDistribution[0].emoji} {moodDistribution[0].label}</strong></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}