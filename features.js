if(!this.document) {
  self.addEventListener("install", (event) => {
    event.waitUntil(self.skipWaiting());
    console.log("install " + event);
  });
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
    console.log("activate " + event);
  });
  
  self.addEventListener("fetch", function (event) {
    console.log(event)
  });
  
  console.log("End of service worker");  

} else {
  //Register the service worker
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('features.js').then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
    // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}

