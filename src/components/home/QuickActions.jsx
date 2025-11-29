import { Plus } from 'lucide-react';

export default function QuickActions({ onCreateTask = () => {}, onCreateJournal = () => {} }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onCreateTask}
        className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <Plus className="w-6 h-6 mb-2" />
        <p className="font-semibold">New Task</p>
      </button>
      <button
        onClick={onCreateJournal}
        className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
      >
        <Plus className="w-6 h-6 mb-2" />
        <p className="font-semibold">New Journal</p>
      </button>
    </div>
  );
}
