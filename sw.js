const CACHE = 'family-tree-v1';
const ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './js/app.js',
  './data/family.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});