const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YXpndmJzcmh6eHBjYWRmemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ0MjY4OTEsImV4cCI6MTk2MDAwMjg5MX0.F7YUIpCLGHgKLrOHN97nhmFkN_hLGvC0SMz8uTvAQTU"
const supabaseapi = "https://gvazgvbsrhzxpcadfzcb.supabase.co/rest/v1/requests"

const filteredOrigins = ['localhost', 'googleapis']
const filteredUrls = ['gstatic', 'localhost', 'loom']

const sendToBackend = async (request) => {
  fetch(supabaseapi, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': 'Bearer '+key,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
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
    origin = event.request.referrer

    if (!filteredOrigins.some(element => origin.includes(element)) && !filteredUrls.some(element => url.includes(element)) &&!url.includes(origin)) {
      request = {
        unix_timestamp: new Date(unixTimestamp).toISOString(),
        method: method,
        url: url,
        origin: origin
      } 
      
      //2) Send request information to backend (later: for specific trackerID)
      await sendToBackend(request)
    }

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

