import { MOODS } from '../../utils/constants';

export default function MoodSelector({ selectedMood, onSelect }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-3">
        How are you feeling? 😊
      </label>
      <div className="grid grid-cols-3 gap-3">
        {MOODS.map(mood => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onSelect(mood.value)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedMood === mood.value
                ? 'border-purple-500 bg-purple-50 shadow-md'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <p className={`text-sm font-medium ${
              selectedMood === mood.value ? 'text-purple-700' : 'text-slate-700'
            }`}>
              {mood.label}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}