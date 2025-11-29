import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useJournals } from '../hooks/useJournals';
import JournalCard from '../components/journal/JournalCard';
import JournalForm from '../components/journal/JournalForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';

export default function JournalPage({ onNavigate }) {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { journals, loading, refetch } = useJournals();

  const filteredJournals = journals.filter(journal =>
    journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    journal.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-6 pt-12 pb-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">My Journal</h1>
              <p className="text-indigo-100">{filteredJournals.length} entries</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="w-12 h-12 bg-white text-indigo-600 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center"
            >
              <Plus className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search journals..."
              className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-0 rounded-xl focus:ring-2 focus:ring-white/50"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <LoadingSpinner />
        ) : filteredJournals.length === 0 ? (
          <EmptyState
            icon="📖"
            title={searchQuery ? 'No journals found' : 'Start your journal'}
            description={searchQuery ? 'Try a different search term' : 'Write your first entry and track your daily thoughts'}
            action={
              !searchQuery && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                >
                  Create Journal
                </button>
              )
            }
          />
        ) : (
          <div className="space-y-3">
            {filteredJournals.map(journal => (
              <JournalCard
                key={journal.id}
                journal={journal}
                onClick={() => onNavigate('journal', 'detail', journal.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <JournalForm
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