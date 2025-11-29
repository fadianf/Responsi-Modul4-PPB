import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, Lock, Unlock, Tag } from 'lucide-react';
import { useJournal } from '../hooks/useJournals';
import { formatDate, formatRelativeTime } from '../../utils/helpers';
import { MOODS } from '../../utils/constants';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ConfirmModal from '../components/common/ConfirmModal';
import JournalForm from '../components/journal/JournalForm';
import journalService from '../../services/journalService';

export default function JournalDetailPage({ journalId, onBack }) {
  const { journal, loading, refetch } = useJournal(journalId);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const result = await journalService.deleteJournal(journalId);
      if (result.success) {
        alert('Journal deleted successfully!');
        onBack();
      }
    } catch (error) {
      console.error('Error deleting journal:', error);
      alert('Failed to delete journal');
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

  if (!journal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Journal not found</p>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const mood = MOODS.find(m => m.value === journal.mood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24">
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
              className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-white/50">
          {/* Mood Badge */}
          <div className="flex items-center justify-between mb-6">
            <div 
              className="flex items-center gap-3 px-4 py-2 rounded-xl"
              style={{ backgroundColor: `${mood?.color}20` }}
            >
              <span className="text-3xl">{mood?.emoji}</span>
              <span className="font-semibold text-slate-800">{mood?.label}</span>
            </div>
            {journal.is_private ? (
              <div className="flex items-center gap-2 text-slate-500">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Private</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500">
                <Unlock className="w-4 h-4" />
                <span className="text-sm">Public</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {journal.title}
          </h1>

          {/* Date */}
          <p className="text-slate-500 mb-6">{formatDate(journal.created_at)}</p>

          {/* Content */}
          <div className="prose prose-slate max-w-none mb-6">
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
              {journal.content}
            </p>
          </div>

          {/* Tags */}
          {journal.tags && journal.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {journal.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Last updated {formatRelativeTime(journal.updated_at)}
            </p>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      {showEditForm && (
        <JournalForm
          journal={journal}
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
        title="Hapus Jurnal"
        message={
          'Apakah Anda yakin ingin menghapus jurnal ini? Tindakan ini tidak dapat dibatalkan.'
        }
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isLoading={deleting}
      />
    </div>
  );
}