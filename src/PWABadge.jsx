import { useRegisterSW } from 'virtual:pwa-register/react';

function PWABadge() {
  const period = 60 * 60 * 1000; // check every hour
  
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (period <= 0) return;
      if (r?.active?.state === 'activated') {
        registerPeriodicSync(period, swUrl, r);
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', (e) => {
          const sw = e.target;
          if (sw.state === 'activated') registerPeriodicSync(period, swUrl, r);
        });
      }
    },
  });

  function close() {
    setOfflineReady(false);
    setNeedRefresh(false);
  }

  return (
    <div className="fixed bottom-20 right-4 m-4 z-50" role="alert">
      {(offlineReady || needRefresh) && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[280px] max-w-md animate-fadeIn">
          <div className="mb-3">
            {offlineReady ? (
              <span className="text-sm text-slate-700 font-medium">
                ✅ App ready to work offline
              </span>
            ) : (
              <span className="text-sm text-slate-700 font-medium">
                🆕 New content available, click reload to update
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {needRefresh && (
              <button
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-xl transition-colors"
                onClick={() => updateServiceWorker(true)}
              >
                Reload
              </button>
            )}
            <button
              className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors"
              onClick={() => close()}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PWABadge;

function registerPeriodicSync(period, swUrl, r) {
  if (period <= 0) return;
  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) return;
    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache',
      },
    });
    if (resp?.status === 200) await r.update();
  }, period);
}