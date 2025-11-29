import { useState, useEffect } from 'react';
import { User, Mail, Edit2, Camera, Save } from 'lucide-react';
import { getUserProfile, saveUserProfile } from '../services/userService';
import useToast from '../hooks/useToast';
import { useTodos } from '../hooks/useTodos';
import { useJournals } from '../hooks/useJournals';

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    avatar: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  
  const { todos } = useTodos();
  const { journals } = useJournals();

  useEffect(() => {
    const userProfile = getUserProfile();
    setProfile(userProfile);
    setEditData(userProfile);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toast = useToast();
  const handleSave = () => {
    const result = saveUserProfile(editData);
    if (result.success) {
      setProfile(result.data);
      setIsEditing(false);
      toast.addToast({ message: 'Profile updated successfully!', type: 'success' });
    }
  };

  const completedTodos = todos.filter(t => t.is_completed).length;
  const activeTodos = todos.length - completedTodos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-600 px-6 pt-12 pb-20 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-violet-100">Manage your account</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-12">
        {/* Profile Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50 mb-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
                {(isEditing ? editData.avatar : profile.avatar) ? (
                  <img 
                    src={isEditing ? editData.avatar : profile.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (isEditing ? editData.username : profile.username).charAt(0).toUpperCase()
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-violet-700 transition-colors shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {isEditing ? (
              <input
                type="text"
                value={editData.username}
                onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                className="text-2xl font-bold text-slate-800 text-center border-b-2 border-violet-300 focus:border-violet-600 outline-none bg-transparent px-4 py-1"
              />
            ) : (
              <h2 className="text-2xl font-bold text-slate-800">{profile.username}</h2>
            )}
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Bio
            </label>
            {isEditing ? (
              <textarea
                value={editData.bio}
                onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
              />
            ) : (
              <p className="text-slate-600 px-4 py-3 bg-slate-50 rounded-xl">
                {profile.bio || 'No bio yet. Click edit to add one!'}
              </p>
            )}
          </div>

          {/* Edit/Save Button */}
          <button
            onClick={() => {
              if (isEditing) {
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center gap-2"
          >
            {isEditing ? (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            ) : (
              <>
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{completedTodos}</p>
            <p className="text-sm text-slate-500">Tasks Completed</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{activeTodos}</p>
            <p className="text-sm text-slate-500">Active Tasks</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">📖</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{journals.length}</p>
            <p className="text-sm text-slate-500">Journal Entries</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">🔥</span>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{todos.length + journals.length}</p>
            <p className="text-sm text-slate-500">Total Activities</p>
          </div>
        </div>

        {/* About App */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
          <h3 className="text-lg font-bold text-slate-800 mb-4">About Daily Journal</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>📱 <strong>Version:</strong> 1.0.0</p>
            <p>✨ <strong>Features:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Create and manage daily tasks</li>
              <li>Write personal journal entries</li>
              <li>Track your mood and emotions</li>
              <li>View productivity statistics</li>
              <li>Offline support with PWA</li>
            </ul>
            <p className="pt-3">
              💜 Made with love for productivity enthusiasts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}