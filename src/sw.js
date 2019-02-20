/**
 * @file Service Worker
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Install_and_activate_populating_your_cache} MDN on Service Workers
 */
console.log('did you even load?');

self.addEventListener('install', function(e) {


	e.waitUntil(
		caches.open('NM_v1').then(function(cache) {
			return cache.addAll([
				'/',
				'/App.js',
				'App.css',
				'Filter.js',
				'index.js',
				'Map.js',
				'sw.js'
			]);
		})
	);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then(response => response || fetch(e.request))
	);
});