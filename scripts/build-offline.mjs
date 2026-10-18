import{readFile,writeFile,readdir,mkdir,copyFile}from'node:fs/promises';import{createHash}from'node:crypto';
const html=await readFile('index.html','utf8');const assets=[...html.matchAll(/(?:src|href)="\.\/(assets\/[^\"]+)"/g)].map(x=>'./'+x[1]);const version=createHash('sha256').update(html).digest('hex').slice(0,12);const files=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/apple-touch-icon.png',...assets];
await mkdir('icons',{recursive:true});for(const f of await readdir('public/icons'))await copyFile('public/icons/'+f,'icons/'+f);await copyFile('public/manifest.webmanifest','manifest.webmanifest');
await writeFile('sw.js',`const CACHE='vendoros-${version}',FILES=${JSON.stringify(files)};
self.addEventListener('message',e=>{if(e.data?.type==='ACTIVATE_UPDATE')self.skipWaiting()});
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('vendoros-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const url=new URL(e.request.url);if(e.request.method!=='GET'||url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).catch(()=>caches.open(CACHE).then(c=>c.match('./index.html'))));return;}if(FILES.some(f=>new URL(f,self.registration.scope).href===url.href))e.respondWith(caches.open(CACHE).then(async c=>(await c.match(e.request))||fetch(e.request)));});\n`);
console.log('Offline shell generated:',version);
