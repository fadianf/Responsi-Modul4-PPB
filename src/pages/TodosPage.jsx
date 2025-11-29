import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import TodoCard from '../components/todos/TodoCard';
import TodoForm from '../components/todos/TodoForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import todoService from '../services/todoService';

export default function TodosPage({ onNavigate }) {
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const { todos, loading, refetch } = useTodos();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.is_completed;
    if (filter === 'completed') return todo.is_completed;
    return true;
  });

  const handleToggle = async (id) => {
    try {
      await todoService.toggleTodo(id);
      refetch();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-600 px-6 pt-12 pb-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">My Tasks</h1>
              <p className="text-purple-100">{filteredTodos.length} tasks</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="w-12 h-12 bg-white text-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center"
            >
              <Plus className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/80 text-slate-700 hover:bg-white'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        {loading ? (
          <LoadingSpinner />
        ) : filteredTodos.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No tasks yet"
            description="Start by creating your first task"
            action={
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-medium"
              >
                Create Task
              </button>
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredTodos.map(todo => (
              <TodoCard
                key={todo.id}
                todo={todo}
                onClick={() => onNavigate('todos', 'detail', todo.id)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <TodoForm
          onClose={() => setShowForm(false)}
          onSuccess={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}
    </div>
  );
}