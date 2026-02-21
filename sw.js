/* ============================================================
   GovTech Design Playbook — sw.js
   Service Worker: cache-first strategy for offline support.

   NOTE: Service workers require HTTPS or localhost.
         This will not function over the file:// protocol.

   v2: Add background sync for checklist state.
       Add push notification support (gov announcements).
       Implement stale-while-revalidate for dynamic content.
   ============================================================ */

const CACHE_NAME = 'design-playbook-v1';

/* All static assets to precache on install */
const STATIC_ASSETS = [
  '',
  'index.html',
  'css/main.css',
  'css/components.css',
  'js/config.js',
  'js/navigation.js',
  'js/install.js',
  'js/app.js',
  'manifest.json',
  'assets/icons/icon.svg',
];

/* ----------------------------------------------------------
   INSTALL — precache all static assets
---------------------------------------------------------- */
self.addEventListener('install', (event) => {
  const scope = self.registration.scope;

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map(asset => scope + asset));
    })
  );

  // Activate immediately without waiting for old tabs to close
  self.skipWaiting();
});

/* ----------------------------------------------------------
   ACTIVATE — delete stale caches from previous versions
---------------------------------------------------------- */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );

  // Take control of all open clients immediately
  self.clients.claim();
});

/* ----------------------------------------------------------
   FETCH — cache-first with network fallback.
   Falls back to cached index.html for navigation requests
   (enables offline support and SPA-style deep linking).
---------------------------------------------------------- */
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      // Not in cache — fetch from network and cache the response
      return fetch(event.request)
        .then((response) => {
          if (
            response &&
            response.status === 200 &&
            response.type === 'basic'
          ) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline fallback for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match(self.registration.scope + 'index.html');
          }
          // For other requests (images etc), fail silently
        });
    })
  );
});
