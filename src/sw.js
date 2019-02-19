/**
 * @file Service Worker
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Install_and_activate_populating_your_cache} MDN on Service Workers
 */
console.log('did you even load?');

self.addEventListener('install', function(e) {


	e.waitUntil(
		caches.open('v1').then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/js/main.js',
				'/js/dbhelper.js',
				'/js/restaurant_info.js',
				'/data/restaurants.json',
				'/img/1.jpg',
				'/img/2.jpg',
				'/img/3.jpg',
				'/img/4.jpg',
				'/img/5.jpg',
				'/img/6.jpg',
				'/img/7.jpg',
				'/img/8.jpg',
				'/img/9.jpg',
				'/img/10.jpg'
			]);
		})
	);
});

self.addEventListener('fetch', (e) => {
	e.respondWith(
		caches.match(e.request).then(response => response || fetch(e.request))
	);
});