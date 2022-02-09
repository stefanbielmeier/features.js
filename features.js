


//Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./custom-worker.js').then((registration) => {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
  // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}
