const staticTaskTracker = "pocket-task-tracker-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticTaskTracker).then(cache => {
      console.log('cache', cache)
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})