// FlowSense AI - Mobile PWA Service Worker
const CACHE_NAME = 'flowsense-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './config.js',
  './manifest.json',
  './src/services/geminiService.js',
  './src/services/hapticsService.js',
  './src/types/index.js',
  './src/data/mockData.js',
  './src/context/CrowdContext.js',
  './src/components/common/ApiKeyModal.js',
  './src/components/common/GeminiAssistantModal.js',
  './src/components/common/Navbar.js',
  './src/components/common/MobileBottomNav.js',
  './src/components/common/StatusBadge.js',
  './src/components/common/CapacityGauge.js',
  './src/components/landing/LandingView.js',
  './src/components/citizen/CitizenView.js',
  './src/components/citizen/LocationDetailModal.js',
  './src/components/citizen/VirtualQueueModal.js',
  './src/components/admin/AdminDashboard.js',
  './src/components/admin/VenueManagerModal.js',
  './src/components/admin/CameraFeedGrid.js',
  './src/components/kiosk/KioskScanner.js',
  './src/App.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(ASSETS_TO_CACHE).catch(err => console.warn('[ServiceWorker] Asset caching warning:', err));
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network-first with cache fallback strategy for dynamic app assets
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});
