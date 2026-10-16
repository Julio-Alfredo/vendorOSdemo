import {validateData} from './model';
export type Identity={userId:string;email:string};
type Store={prepare:(sql:string)=>{bind:(...values:any[])=>{first:()=>Promise<any>}}};
const response=(body:any,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'private, no-store','Vary':'Cookie','X-Content-Type-Options':'nosniff'}});
export async function workspaceRequest(request:Request,user:Identity|null,db:Store):Promise<Response>{
 if(!user)return response({error:'Sign in required'},401);
 if(request.method==='GET'){const row=await db.prepare('SELECT data, revision FROM workspaces WHERE user_id = ?').bind(user.userId).first();return response({userId:user.userId,email:user.email,data:row?JSON.parse(row.data):null,revision:row?.revision||0})}
 if(request.method!=='PUT')return response({error:'Method not allowed'},405);
 if(request.headers.get('origin')!==new URL(request.url).origin)return response({error:'Origin not allowed'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return response({error:'JSON required'},415);
 if(Number(request.headers.get('content-length')||0)>1000000)return response({error:'Workspace exceeds 1 MB. Export a backup and reduce the event history.'},413);
 let body;try{const text=await request.text();if(text.length>1000000)return response({error:'Workspace too large'},413);body=JSON.parse(text)}catch{return response({error:'Invalid JSON'},400)}
 if(!Number.isSafeInteger(body.revision)||body.revision<0||!validateData(body.data))return response({error:'Invalid workspace'},400);
 const result=await db.prepare(`INSERT INTO workspaces (user_id,data,revision,updated_at) SELECT ?,?,1,? WHERE ? = 0 ON CONFLICT(user_id) DO UPDATE SET data=excluded.data, revision=workspaces.revision+1, updated_at=excluded.updated_at WHERE workspaces.revision = ? RETURNING revision`).bind(user.userId,JSON.stringify(body.data),new Date().toISOString(),body.revision,body.revision).first();
 // For existing workspaces use an atomic guarded update; the INSERT SELECT path is only for first creation.
 if(result)return response({revision:result.revision});
 if(body.revision>0){const updated=await db.prepare('UPDATE workspaces SET data=?,revision=revision+1,updated_at=? WHERE user_id=? AND revision=? RETURNING revision').bind(JSON.stringify(body.data),new Date().toISOString(),user.userId,body.revision).first();if(updated)return response({revision:updated.revision})}
 return response({error:'Another device has changed this workspace. Export this copy and reload.'},409);
}
