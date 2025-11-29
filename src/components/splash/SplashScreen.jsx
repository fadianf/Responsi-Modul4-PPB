import { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              if (typeof onComplete === 'function') onComplete();
            }, 500);
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-8">
        <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl">
          <BookOpen className="w-12 h-12 text-white" strokeWidth={2} />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-white mb-2">Daily Journal</h1>
      <p className="text-purple-100 text-lg mb-12">Your Personal Space</p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-purple-100 text-sm">Organize • Reflect • Grow</p>
      </div>
    </div>
  );
}