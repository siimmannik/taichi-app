const CACHE='taichi-v1';
const ASSETS=["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "images/hero.jpg", "images/move-ball.jpg", "images/move-breathe.jpg", "images/move-close.jpg", "images/move-cloud.jpg", "images/move-gather.jpg", "images/move-knee.jpg", "images/move-meditate.jpg", "images/move-neck.jpg", "images/move-pat.jpg", "images/move-raise.jpg", "images/move-shift.jpg", "images/move-stretch.jpg", "images/move-warmpalms.jpg", "images/move-warmup.jpg", "images/move-wuji.jpg"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()).catch(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{
    try{const cp=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));}catch(_){}
    return resp;
  }).catch(()=>caches.match('index.html'))));
});
