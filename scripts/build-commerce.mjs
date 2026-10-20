import {readFile,writeFile,cp,mkdir} from 'node:fs/promises';
const app=await readFile('downloads/VendorOS.html');
const template=await readFile('commerce/starter-template.html','utf8');
await writeFile('commerce/package.ts','export const starterHtml='+JSON.stringify(template.replace('__VENDOROS_APP_BASE64__',app.toString('base64')))+';');
await cp('commerce/web','dist',{recursive:true});
await writeFile('dist/_routes.json',JSON.stringify({version:1,include:['/api/commerce/*','/starter'],exclude:[]}));
console.log('Cloudflare commerce built; checkout remains gated by server configuration.');
