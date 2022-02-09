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
    
    //1) Get each outgoing HTTP Request to Backend (incl. URL) and point in time
    timestamp = new Date()
    url = event.request.url
    unixTimestamp = timestamp.getTime()
    method = event.request.method

    if (url.includes("heroku")){
      console.log(timestamp, unixTimestamp, method, url)
    }
  
    //TODO: Add more information (e.g. headers if possible)
    //https://stackoverflow.com/questions/57583086/service-worker-not-getting-body-from-request

    //2) Record all requests and send them to backend (later: for specific trackerID)

    //3) Count requests with same url endpoint, method, and timestamp in same day

    //4) Put it in a graph: x-axis day (date), y-axis: #requests

    //5) Show one graph per URL and Method. Give graph name of URL & Method.

    //6) Login etc.


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

