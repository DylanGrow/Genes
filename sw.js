const CACHE = 'family-tree-v2';
const ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './js/app.js',
  './js/data-manager.js',
  './js/editor.js',
  './js/firebase-config.js',
  './js/photo-storage.js',
  './js/photo-ui.js',
  './js/timeline.js',
  './js/timeline-ui.js',
  './js/smart-features.js',
  './js/importer.js',
  './js/analytics.js',
  './js/charts.js',
  './data/family.json'
];

// Install event - cache all assets
self.addEventListener('install', e => {
  console.log('[ServiceWorker] Installing...');
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      console.log('[ServiceWorker] Caching assets');
      return cache.addAll(ASSETS);
    }).then(() => {
      console.log('[ServiceWorker] Skip waiting');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activating...');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE).map(key => {
          console.log('[ServiceWorker] Removing old cache:', key);
          return caches.delete(key);
        })
      );
    }).then(() => {
      console.log('[ServiceWorker] Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', e => {
  // Skip non-GET requests
  if (e.request.method !== 'GET') return;
  
  // Skip external requests (Firebase, etc.)
  if (!e.request.url.startsWith(self.location.origin)) return;
  
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) {
        console.log('[ServiceWorker] Serving from cache:', e.request.url);
        return response;
      }
      
      console.log('[ServiceWorker] Fetching from network:', e.request.url);
      return fetch(e.request).then(response => {
        // Don't cache non-successful responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        
        // Clone the response
        const responseToCache = response.clone();
        
        // Cache the fetched response for future use
        caches.open(CACHE).then(cache => {
          cache.put(e.request, responseToCache);
        });
        
        return response;
      });
    }).catch(error => {
      console.error('[ServiceWorker] Fetch failed:', error);
      // Return a custom offline page if available
      return caches.match('./index.html');
    })
  );
});

// Handle messages from clients
self.addEventListener('message', e => {
  if (e.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});