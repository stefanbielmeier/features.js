//Installation:
//1) Add file to public folder of your react app. 
//2) Add <script src="%PUBLIC_URL%/features.js"></script> in the <head></head> tags of your index.html file
//3) Done!

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
    console.log(event.request)
    

    //https://stackoverflow.com/questions/57583086/service-worker-not-getting-body-from-request

    






  });
  
  console.log("End of service worker");  

} else {
  //Register the service worker
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./features.js').then((registration) => {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
    // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
}

