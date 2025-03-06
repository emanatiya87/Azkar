// Service Worker for Azkar App

const CACHE_NAME = 'azkar-app-v1';
const urlsToCache = [
    './',
    './index.html',
    './ad3yaQuraan.html',
    './azkarElestykaz.html',
    './azkarElmasaa.html',
    './azkarElnom.html',
    './azkarElsabah.html',
    './azkarSalah.html',
    './podcast.html',
    './tsabeeh.html',

    // CSS files
    './css/bootstrap.min.css',
    './css/style.css',
    './css/styleHome.css',

    // JS files
    './js/bootstrap.min.js',
    './js/script.js',
    './js/azkar.json',
    './js/darkmood.js',
    './js/fetchad3yaQuraan.js',
    './js/fetchAzkar.js',
    './js/fetchazkarAlmasaa.js',
    './js/fetchAzkarAlsalah.js',
    './js/fetchAzkarElnom.js',
    './js/fetchAzkarEstykaz.js',
    './js/fetchpodcast.js',
    './js/fetchtsabeeh.js',
    './js/fetchCounter.js',
    './js/fetchCounterTsabeeh.js',
    './js/fetchCounterEstykaz.js',
    './js/fetchCounterPodcast.js',
    './js/fetchCounterElnom.js',

    // Images
    './images/brightness-and-contrast.png',
    './images/dark&light Mood.jpg',
    './images/download.jpg',
    './images/download.png',
    './images/download2.jpg',
    './images/download3.jpg',
    './images/download4.jpg',
    './images/images.jpg',
    './images/images.png',
    './images/images1.jpg',
    './images/images2.jpg',
    './images/images5.jpg',
    './images/images8.jpg',
    './images/logo.jpg',
    './images/moon-half-visible-face-on-night-sky.jpg'
];

// Install event - cache assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return Promise.all(
                    urlsToCache.map(url => {
                        return cache.add(url).catch(error => {
                            console.error(`Failed to cache: ${url}`, error);
                            return Promise.resolve();
                        });
                    })
                );
            })
    );
});

// Fetch event - handle requests and serve from cache
self.addEventListener('fetch', event => {
    let requestUrl = new URL(event.request.url);

    // Ensure the root `/` serves `index.html`
    if (requestUrl.origin === location.origin && requestUrl.pathname === '/') {
        event.respondWith(caches.match('./index.html'));
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) return response;

                return fetch(event.request).then(networkResponse => {
                    // Only cache valid responses
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }

                    let responseToCache = networkResponse.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return networkResponse;
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                    return Promise.resolve();
                })
            );
        })
    );
});
