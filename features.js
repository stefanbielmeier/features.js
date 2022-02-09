const sendToBackend = async (request) => {
  fetch('localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
  .then(response => response.json())
  .then(data => {
  console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

if(!this.document) {

  self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
    console.log("install " + event);
  });
  
  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
    console.log("activate " + event);
  });
  
  self.addEventListener("fetch", async (event) => {
    
    //1) Get each outgoing HTTP Request to Backend (incl. URL) and point in time
    //TODO: Add more information (e.g. headers if possible)
    //https://stackoverflow.com/questions/57583086/service-worker-not-getting-body-from-request

    timestamp = new Date()
    url = event.request.url
    unixTimestamp = timestamp.getTime()
    method = event.request.method

    if (url.includes("heroku")){
      request = {
        timestamp: timestamp,
        unixTimestamp: unixTimestamp,
        method: method,
        url: url
      }
      
      console.log(request)

      //2) Send request information to backend (later: for specific trackerID
      await sendToBackend(request)
    }
  
    //3) Count requests with same url endpoint, method, and timestamp in same day

    //4) Put it in a graph: x-axis day (date), y-axis: #requests

    //5) Show one graph per URL and Method. Give graph name of URL & Method.

    //6) Login etc.

  });  




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

