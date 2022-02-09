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

console.log("End of script");
