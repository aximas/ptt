const staticCacheName = "pocket-task-tracker-v4";
const dynamicCacheName = "pocket-task-tracker-v4";

const assets = [
  "index.html",
  "/css/style.css",
  "/js/app.js",
  "offline.html"
]

self.addEventListener("install", async () => {
  try {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assets)
  }
  catch (e) {
    console.log('e', e)
  }
});

self.addEventListener("activate", async () => {
  const cacheNames = await caches.keys()

  await Promise.all(cacheNames
    .filter(cache => cache !== staticCacheName)
    .filter(cache => cache !== dynamicCacheName)
    .map(cache => caches.delete(cache)))
})

const cacheFirst = async (request) => {
  const cached = await caches.match(request)
  return cached ?? fetch(request)
}

const networkFirst = async (request) => {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone());
    
    return response;
  }
  catch(e) {
    const cached = cache.match(request);
    return cached ?? await caches.match('/offline.html');
  }
}

self.addEventListener("fetch", fetchEvent => {
  const {request} = fetchEvent;

  const url = new URL(request.url);
  if(url.origin === location.origin) {
    fetchEvent.respondWith(cacheFirst(request))
  } else {
    fetchEvent.respondWith(networkFirst(request))
  }
});

