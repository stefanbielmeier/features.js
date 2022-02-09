


//Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('https://gitfront.io/r/user-6005028/c158b63770de1bc3fe53cae285a592578a94a8e3/features.js/raw/service-worker.js').then((registration) => {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
  // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
