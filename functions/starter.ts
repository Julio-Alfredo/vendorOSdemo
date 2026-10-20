import {authorized,headers,type CommerceEnv} from '../commerce/core';
import {starterHtml} from '../commerce/package';
export async function onRequest({request,env}:{request:Request;env:CommerceEnv}){try{if(!await authorized(request,env))return new Response(null,{status:303,headers:{...headers,Location:'/purchase'}});return new Response(starterHtml,{headers:{...headers,'Content-Type':'text/html; charset=utf-8'}})}catch{return new Response('Purchase access is unavailable. Please retry; do not pay again.',{status:503,headers})}}
