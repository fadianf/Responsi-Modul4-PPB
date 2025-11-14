import React, { useState } from 'react';
import { BookOpen, User, Home, Calendar, Heart, Smile, Meh, Frown, Sun, Moon, Cloud, Plus } from 'lucide-react';
import './index.css';

// ============================================
// DATA STATIS
// ============================================

const journalEntries = [
  {
    id: 1,
    date: '2025-11-14',
    title: 'Mengerjakan Responsi PPB Modul 4',
    mood: 'happy',
    weather: 'sunny',
    content: 'Hari ini Fadia mengerjakan responsi PPB Modul 4',
    tags: ['kuliah']
  },
  {
    id: 2,
    date: '2025-11-13',
    title: 'Mengerjakan 4 Deadline yang GONG',
    mood: 'focused',
    weather: 'cloudy',
    content: 'Mengejar waktu untuk mengerjakan 4 deadline dengan terburu-buru dan harus produktif. But I did it!',
    tags: ['belajar', 'lomba']
  },
  {
    id: 3,
    date: '2025-11-12',
    title: 'Mengerjakan tugas yang bejibun',
    mood: 'tired',
    weather: 'rainy',
    content: 'Deadline tugas semakin dekat. Harus fokus menyelesaikan semua tugas yang menumpuk minggu ini.',
    tags: ['tugas', 'deadline']
  },
  {
    id: 4,
    date: '2025-11-11',
    title: 'Weekend capek',
    mood: 'tired',
    weather: 'rainy',
    content: 'Sibuk-sibuk-sibuk hehe. KAPAN LIBURAN:(((',
    tags: ['weekend', 'organization']
  },
  {
    id: 5,
    date: '2025-11-10',
    title: 'Sakit Hiks',
    mood: 'nervous',
    weather: 'rainy',
    content: 'Tiba-tiba sakit tapi malam harus ke Bandungan',
    tags: ['makrab', 'sertijab']
  }
];

const profileData = {
  name: 'Fadia Nur Fatimah',
  nim: '21120123120022',
  group: 'Kelompok 33',
  major: 'Teknik Komputer',
  university: 'Universitas Diponegoro',
  photo: '',
  bio: 'Live to increase value and always fight whatever the challenges come'
};

// Mood stats will be calculated dynamically based on journals

// ============================================
// KOMPONEN MOOD ICON
// ============================================

const MoodIcon = ({ mood, size = 'w-6 h-6' }) => {
  const moodConfig = {
    happy: { Icon: Smile, color: 'text-yellow-500' },
    focused: { Icon: Meh, color: 'text-blue-500' },
    tired: { Icon: Frown, color: 'text-gray-500' },
    nervous: { Icon: Meh, color: 'text-orange-500' }
  };
  
  const config = moodConfig[mood] || moodConfig.focused;
  const Icon = config.Icon;
  
  return <Icon className={`${size} ${config.color}`} />;
};

// ============================================
// KOMPONEN WEATHER ICON
// ============================================

const WeatherIcon = ({ weather, size = 'w-5 h-5' }) => {
  const weatherConfig = {
    sunny: { Icon: Sun, color: 'text-yellow-500' },
    cloudy: { Icon: Cloud, color: 'text-gray-500' },
    rainy: { Icon: Cloud, color: 'text-blue-500' }
  };
  
  const config = weatherConfig[weather] || weatherConfig.cloudy;
  const Icon = config.Icon;
  
  return <Icon className={`${size} ${config.color}`} />;
};

// ============================================
// HALAMAN HOME
// ============================================

const HomePage = ({ journals }) => {
  // Calculate dynamic mood stats
  const moodStatsConfig = {
    happy: { icon: Smile, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    focused: { icon: Meh, color: 'text-blue-500', bg: 'bg-blue-50' },
    tired: { icon: Frown, color: 'text-gray-500', bg: 'bg-gray-50' },
    nervous: { icon: Meh, color: 'text-orange-500', bg: 'bg-orange-50' }
  };

  const moodStats = {
    happy: { 
      count: journals.filter(j => j.mood.toLowerCase() === 'happy').length,
      ...moodStatsConfig.happy
    },
    focused: { 
      count: journals.filter(j => j.mood.toLowerCase() === 'focused').length,
      ...moodStatsConfig.focused
    },
    tired: { 
      count: journals.filter(j => j.mood.toLowerCase() === 'tired').length,
      ...moodStatsConfig.tired
    },
    nervous: { 
      count: journals.filter(j => j.mood.toLowerCase() === 'nervous').length,
      ...moodStatsConfig.nervous
    }
  };

  const positivePercentage = journals.length === 0 ? 0 : Math.round((
    journals.filter(j => ['happy', 'focused'].includes(j.mood.toLowerCase())).length / journals.length
  ) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 pb-32 md:pb-24">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 mr-3" />
            <h1 className="text-4xl font-bold">Daily Journal</h1>
          </div>
          <p className="text-center text-purple-100 text-lg">
            Catat momen berharga dalam hidup setiap hari
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{journals.length}</div>
            <div className="text-sm text-gray-600">Total Jurnal</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{calculateTotalDays(journals)}</div>
            <div className="text-sm text-gray-600">Hari - Hari</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Smile className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">{positivePercentage}%</div>
            <div className="text-sm text-gray-600">Mood Positif</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800">Nov</div>
            <div className="text-sm text-gray-600">Bulan Ini</div>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-purple-600" />
            Jurnal Terbaru
          </h2>
          <div className="space-y-4">
            {journals.slice(-3).reverse().map(entry => (
              <div key={entry.id} className="border-l-4 border-purple-500 pl-4 py-2 hover:bg-purple-50 transition-colors rounded-r-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{entry.title}</h3>
                  <div className="flex items-center gap-2">
                    <MoodIcon mood={entry.mood} size="w-5 h-5" />
                    <WeatherIcon weather={entry.weather} size="w-5 h-5" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{entry.content.substring(0, 100)}...</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{entry.date}</span>
                  <div className="flex gap-2">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-pink-600" />
            Analisis Mood
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(moodStats).map(([mood, data]) => {
              const Icon = data.icon;
              return (
                <div key={mood} className={`${data.bg} rounded-lg p-4 flex items-center justify-between`}>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{data.count}</div>
                    <div className="text-sm text-gray-600 capitalize">{mood}</div>
                  </div>
                  <Icon className={`w-8 h-8 ${data.color}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HALAMAN JURNAL
// ============================================

const JournalPage = ({ journals, onDelete, onUpdate }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [editFormData, setEditFormData] = useState({
    date: '',
    title: '',
    content: '',
    mood: 'happy',
    weather: 'sunny',
    tags: ''
  });

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startEdit = (entry) => {
    setEditingEntry(entry.id);
    setEditFormData({
      date: entry.date,
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      weather: entry.weather,
      tags: entry.tags.join(', ')
    });
  };

  const handleUpdateJournal = (e) => {
    e.preventDefault();
    
    const updatedData = {
      date: editFormData.date,
      title: editFormData.title,
      content: editFormData.content,
      mood: editFormData.mood,
      weather: editFormData.weather,
      tags: editFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };
    
    onUpdate(editingEntry, updatedData);
    alert('✅ Jurnal berhasil diupdate!');
    
    // Update selectedEntry untuk display yang updated
    setSelectedEntry({
      ...selectedEntry,
      ...updatedData
    });
    
    setEditingEntry(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pb-32 md:pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <BookOpen className="w-8 h-8 mr-3 text-purple-600" />
          Semua Jurnal Harian
        </h1>

        {editingEntry ? (
          // Edit View
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Jurnal</h2>
            <form onSubmit={handleUpdateJournal} className="space-y-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  name="date"
                  value={editFormData.date}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Judul
                </label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Mood and Weather */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Suasana Hati
                  </label>
                  <select
                    name="mood"
                    value={editFormData.mood}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="happy">😊 Bahagia</option>
                    <option value="focused">😐 Fokus</option>
                    <option value="tired">😔 Lelah</option>
                    <option value="nervous">😰 Gugup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cuaca
                  </label>
                  <select
                    name="weather"
                    value={editFormData.weather}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sunny">☀️ Cerah</option>
                    <option value="cloudy">☁️ Berawan</option>
                    <option value="rainy">🌧️ Hujan</option>
                  </select>
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Isi Jurnal
                </label>
                <textarea
                  name="content"
                  value={editFormData.content}
                  onChange={handleEditChange}
                  rows="8"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={editFormData.tags}
                  onChange={handleEditChange}
                  placeholder="misal: belajar, coding, seru"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  💾 Simpan Perubahan
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingEntry(null);
                    setSelectedEntry(null);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  ❌ Batal
                </button>
              </div>
            </form>
          </div>
        ) : selectedEntry ? (
          // Detail View
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <button 
              onClick={() => setSelectedEntry(null)}
              className="text-purple-600 hover:text-purple-800 mb-4 flex items-center"
            >
              ← Kembali ke daftar
            </button>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedEntry.title}</h2>
              <div className="flex items-center gap-3">
                <MoodIcon mood={selectedEntry.mood} size="w-7 h-7" />
                <WeatherIcon weather={selectedEntry.weather} size="w-6 h-6" />
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">{selectedEntry.date}</div>
            <p className="text-gray-700 leading-relaxed mb-4">{selectedEntry.content}</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {selectedEntry.tags.map(tag => (
                <span key={tag} className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(selectedEntry)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                ✏️ Edit Jurnal
              </button>
              <button
                onClick={() => {
                  onDelete(selectedEntry.id);
                  setSelectedEntry(null);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                🗑️ Hapus Jurnal
              </button>
            </div>
          </div>
        ) : (
          // List View
          <div className="space-y-4">
            {journals.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <p className="text-gray-500 text-lg">📔 Belum ada jurnal. Mulai membuat jurnal baru!</p>
              </div>
            ) : (
              journals.map(entry => (
                <div 
                  key={entry.id} 
                  onClick={() => setSelectedEntry(entry)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 cursor-pointer border-l-4 border-purple-500"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">{entry.title}</h3>
                      <span className="text-sm text-gray-500">{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MoodIcon mood={entry.mood} />
                      <WeatherIcon weather={entry.weather} />
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{entry.content.substring(0, 150)}...</p>
                  <div className="flex gap-2">
                    {entry.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// HALAMAN PROFIL
// ============================================

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-32 md:pb-24">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-8 mb-6 text-white text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/foto profile.png" 
              alt={profileData.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
          <p className="text-indigo-100 text-lg">{profileData.major}</p>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <User className="w-6 h-6 mr-2 text-indigo-600" />
            Informasi Mahasiswa
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">NIM</span>
              <span className="text-gray-800 font-semibold">{profileData.nim}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">Kelompok</span>
              <span className="text-gray-800 font-semibold">{profileData.group}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-3">
              <span className="text-gray-600 font-medium">Program Studi</span>
              <span className="text-gray-800 font-semibold">{profileData.major}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Universitas</span>
              <span className="text-gray-800 font-semibold">{profileData.university}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
            Tentang Saya
          </h2>
          <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HALAMAN BUAT JURNAL
// ============================================

const CreateJournalPage = ({ onSave }) => {
  const today = new Date().toISOString().split('T')[0];
  const [formData, setFormData] = useState({
    date: today,
    title: '',
    content: '',
    mood: 'happy',
    weather: 'sunny',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newJournal = {
      id: Date.now(),
      date: formData.date,
      title: formData.title,
      mood: formData.mood,
      weather: formData.weather,
      content: formData.content,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };

    onSave(newJournal);
    alert('✅ Jurnal berhasil disimpan!');
    
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      date: today,
      title: '',
      content: '',
      mood: 'happy',
      weather: 'sunny',
      tags: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 pb-32 md:pb-24">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <Plus className="w-8 h-8 mr-3 text-green-600" />
          Buat Jurnal Baru
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Jurnal
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul jurnal Anda..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Mood and Weather */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Suasana Hati
                </label>
                <select
                  name="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="happy">😊 Bahagia</option>
                  <option value="focused">😐 Fokus</option>
                  <option value="tired">😔 Lelah</option>
                  <option value="nervous">😰 Gugup</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cuaca
                </label>
                <select
                  name="weather"
                  value={formData.weather}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="sunny">☀️ Cerah</option>
                  <option value="cloudy">☁️ Berawan</option>
                  <option value="rainy">🌧️ Hujan</option>
                </select>
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Isi Jurnal
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Ceritakan hari Anda di sini..."
                rows="8"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags (pisahkan dengan koma)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="misal: belajar, coding, seru"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all"
            >
              💾 Simpan Jurnal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ============================================
// BOTTOM NAVIGATION
// ============================================

const BottomNav = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', icon: Home, label: 'Beranda' },
    { id: 'create', icon: Plus, label: 'Buat' },
    { id: 'journal', icon: BookOpen, label: 'Jurnal' },
    { id: 'profile', icon: User, label: 'Profil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-40">
      <div className="flex justify-around items-center h-20">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-500 hover:text-purple-500'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

// ============================================
// DESKTOP NAVIGATION
// ============================================

const DesktopNav = ({ currentPage, onNavigate }) => {
  return (
    <nav className="hidden md:block bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16">
          <BookOpen className="w-8 h-8 text-purple-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">Daily Journal</span>
        </div>
      </div>
    </nav>
  );
};

// ============================================
// HELPER FUNCTIONS
// ============================================

const calculateTotalDays = (journals) => {
  if (journals.length === 0) return 0;
  
  // Hitung hanya hari-hari unik (tidak duplikat tanggal)
  const uniqueDates = new Set(journals.map(j => j.date));
  return uniqueDates.size;
};

const calculateMoodPercentage = (journals) => {
  if (journals.length === 0) return 0;
  
  const positiveMoods = ['happy', 'focused'];
  const positiveCount = journals.filter(j => positiveMoods.includes(j.mood.toLowerCase())).length;
  
  return Math.round((positiveCount / journals.length) * 100);
};

const getMoodStats = (journals) => {
  const stats = {
    happy: 0,
    focused: 0,
    tired: 0,
    nervous: 0
  };
  
  journals.forEach(journal => {
    const mood = journal.mood.toLowerCase();
    if (mood in stats) {
      stats[mood]++;
    }
  });
  
  return stats;
};

// Old function kept for reference - counts consecutive days from today
const calculateConsecutiveDays = (journals) => {
  if (journals.length === 0) return 0;
  
  // Sort journals by date descending (newest first)
  const sorted = [...journals].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  let consecutiveDays = 1;
  const today = new Date();
  
  for (let i = 0; i < sorted.length - 1; i++) {
    const currentDate = new Date(sorted[i].date);
    const nextDate = new Date(sorted[i + 1].date);
    
    // Calculate difference in days
    const timeDiff = currentDate - nextDate;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    // Check if dates are consecutive (exactly 1 day apart)
    if (Math.abs(daysDiff - 1) < 0.1) {
      consecutiveDays++;
    } else {
      break;
    }
  }
  
  // Check if the most recent entry is from today or yesterday
  const mostRecentDate = new Date(sorted[0].date);
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const mostRecentDateOnly = new Date(mostRecentDate.getFullYear(), mostRecentDate.getMonth(), mostRecentDate.getDate());
  
  const diffToday = (todayDate - mostRecentDateOnly) / (1000 * 60 * 60 * 24);
  
  return consecutiveDays;
};

// ============================================
// MAIN APP
// ============================================

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [journals, setJournals] = useState(() => {
    const savedJournals = localStorage.getItem('journals');
    return savedJournals ? JSON.parse(savedJournals) : journalEntries;
  });

  const saveJournal = (newJournal) => {
    const updatedJournals = [...journals, newJournal];
    setJournals(updatedJournals);
    localStorage.setItem('journals', JSON.stringify(updatedJournals));
  };

  const updateJournal = (id, updatedData) => {
    const updatedJournals = journals.map(j => 
      j.id === id ? { ...j, ...updatedData } : j
    );
    setJournals(updatedJournals);
    localStorage.setItem('journals', JSON.stringify(updatedJournals));
  };

  const deleteJournal = (id) => {
    const updatedJournals = journals.filter(j => j.id !== id);
    setJournals(updatedJournals);
    localStorage.setItem('journals', JSON.stringify(updatedJournals));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage journals={journals} />;
      case 'create':
        return <CreateJournalPage onSave={saveJournal} />;
      case 'journal':
        return <JournalPage journals={journals} onDelete={deleteJournal} onUpdate={updateJournal} />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage journals={journals} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopNav currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
    </div>
  );
}

// Render React ke DOM
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);