// Let's update the service worker with relative paths and better error handling

const CACHE_NAME = 'azkar-app-v1';
const urlsToCache = [
    // HTML files - using relative paths
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

// Install event with improved error handling
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                // Cache each resource individually to identify failures
                return Promise.all(
                    urlsToCache.map(url => {
                        return cache.add(url).catch(error => {
                            console.error(`Failed to cache: ${url}`, error);
                            // Continue despite the error
                            return Promise.resolve();
                        });
                    })
                );
            })
    );
});

// Fetch event with offline fallback
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from cache
                if (response) {
                    return response;
                }

                // Clone the request because request is a stream and can only be consumed once
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response because response is a stream and can only be consumed once
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // If the fetch fails (user is offline), return a default offline page for HTML requests
                        if (event.request.headers.get('Accept').includes('text/html')) {
                            return caches.match('./offline.html');
                        }
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
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // If this cache name isn't in the whitelist, delete it
                        return caches.delete(cacheName);
                    }
                    return Promise.resolve();
                })
            );
        })
    );
});
