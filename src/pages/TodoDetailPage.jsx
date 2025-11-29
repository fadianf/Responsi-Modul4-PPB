import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Check, Clock, Flag, Calendar } from 'lucide-react';
import { useTodo } from '../hooks/useTodos';
import { formatDate, formatRelativeTime, getPriorityColor } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmModal from '../components/common/ConfirmModal';
import TodoForm from '../components/todos/TodoForm';
import todoService from '../services/todoService';

export default function TodoDetailPage({ todoId, onBack }) {
  const { todo, loading, refetch } = useTodo(todoId);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      await todoService.toggleTodo(todoId);
      refetch();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const result = await todoService.deleteTodo(todoId);
      if (result.success) {
        alert('Task deleted successfully!');
        onBack();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete task');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Task not found</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowEditForm(true)}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
          {/* Status Badge */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                todo.is_completed
                  ? 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center ${
                todo.is_completed ? 'bg-green-500 border-green-500' : 'border-slate-400'
              }`}>
                {todo.is_completed && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </div>
              {todo.is_completed ? 'Completed' : 'Mark as Complete'}
            </button>
            
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(todo.priority)}`}>
              <Flag className="w-3 h-3 inline mr-1" />
              {todo.priority}
            </span>
          </div>

          {/* Title */}
          <h1 className={`text-3xl font-bold text-slate-800 mb-4 ${
            todo.is_completed ? 'line-through text-slate-400' : ''
          }`}>
            {todo.title}
          </h1>

          {/* Description */}
          {todo.description && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                Description
              </h2>
              <p className={`text-slate-600 leading-relaxed whitespace-pre-wrap ${
                todo.is_completed ? 'text-slate-400' : ''
              }`}>
                {todo.description}
              </p>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200">
            {todo.due_date && (
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Due Date</span>
                </div>
                <p className="text-slate-800 font-semibold">{formatDate(todo.due_date)}</p>
              </div>
            )}
            
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-medium">Created</span>
              </div>
              <p className="text-slate-800 font-semibold">{formatRelativeTime(todo.created_at)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <TodoForm
          todo={todo}
          onClose={() => setShowEditForm(false)}
          onSuccess={() => {
            setShowEditForm(false);
            refetch();
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={deleting}
      />
    </div>
  );
}