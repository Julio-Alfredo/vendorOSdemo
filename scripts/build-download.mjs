import {build} from 'vite';
import {mkdir,writeFile} from 'node:fs/promises';
const result=await build({configFile:false,define:{'process.env.NODE_ENV':'"production"'},build:{write:false,minify:true,cssCodeSplit:false,lib:{entry:'src/entry.tsx',name:'VendorOS',formats:['iife']},rollupOptions:{output:{inlineDynamicImports:true}}}});
const outputs=(Array.isArray(result)?result:[result]).flatMap(x=>x.output);
const js=outputs.filter(x=>x.type==='chunk').map(x=>x.code).join('\n').replace(/<\/script/gi,'<\\/script');
const css=outputs.filter(x=>x.type==='asset'&&x.fileName.endsWith('.css')).map(x=>x.source).join('\n');
const html=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#12243c"><title>BVC VendorOS · Downloadable app</title><style>${css}</style></head><body><noscript>Enable JavaScript to use VendorOS.</noscript><div id="root"></div><script>${js}</script></body></html>`;
await mkdir('downloads',{recursive:true});await writeFile('downloads/VendorOS.html',html);
console.log('Created downloads/VendorOS.html — self-contained, no external assets.');
