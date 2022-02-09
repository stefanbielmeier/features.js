


//Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(function(registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
  // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

const defineFeatures = () => {

  self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting());
  });

  self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });

}

