import { useState } from 'react';
import { TrendingUp, CheckCircle, BookOpen, Target, Calendar } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useStatistics } from '../hooks/useStatistics';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatsCard from '../components/home/StatsCard';
import ActivityChart from '../components/statistics/ActivityChart';
import CompletionRate from '../components/statistics/CompletionRate';
import MoodChart from '../components/statistics/MoodChart';

export default function StatisticsPage() {
  const { todos, loading: todosLoading } = useTodos();
  const { loading, totalTodos, completedTodos, activeTodos, completionRate, totalJournals, moodDistribution, activityData, maxActivity } = useStatistics();
  const [timeRange, setTimeRange] = useState('week'); // week, month, all

  const highPriority = todos.filter(t => t.priority === 'high' && !t.is_completed).length;
  const mediumPriority = todos.filter(t => t.priority === 'medium' && !t.is_completed).length;
  const lowPriority = todos.filter(t => t.priority === 'low' && !t.is_completed).length;

  if (todosLoading || loading) {
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
          <StatsCard icon={Target} value={totalTodos} label="Total Tasks" />
          <StatsCard icon={CheckCircle} value={completedTodos} label="Completed" />
          <StatsCard icon={BookOpen} value={totalJournals} label="Journals" />
          <StatsCard icon={TrendingUp} value={`${completionRate}%`} label="Completion" />
        </div>

        {/* Completion Rate */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Task Completion Rate</h2>
          <div className="space-y-4">
            <CompletionRate completed={completedTodos} total={totalTodos} />
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
            <MoodChart distribution={moodDistribution} />
          </div>
        )}

        {/* Activity Chart */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            <Calendar className="w-5 h-5 inline mr-2" />
            Last 7 Days Activity
          </h2>
          <div className="space-y-3">
            <ActivityChart data={activityData} max={maxActivity} />
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