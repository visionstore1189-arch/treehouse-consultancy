import test from "node:test";
import assert from "node:assert/strict";
import { onRequestGet,protectedMaterialResponse } from "../functions/api/auth/resource/[id]";
const request=()=>new Request("https://treehouse.test/api/auth/resource/tour",{headers:{Cookie:"__Host-th_access=fixture"}});
const ctx=(id="tour")=>({request:request(),env:{},params:{id}} as never);
test("unknown material IDs and anonymous requests cannot obtain files",async t=>{
 t.mock.method(globalThis,"fetch",async()=>Response.json({}, {status:401}));
 assert.equal((await onRequestGet(ctx("../../secret"))).status,404);
 assert.equal((await onRequestGet(ctx())).status,401);
});
test("expired, revoked and nonmember requests are denied before any cached storage download",async t=>{
 for(const scenario of ["expired","revoked","nonmember"]){
  let storageCalled=false;
  t.mock.method(globalThis,"fetch",async (u:string)=>{
   if(String(u).endsWith('/auth/v1/user'))return Response.json({id:"user"});
   if(String(u).includes('/dawabit_demo_grants'))return Response.json([{access_kind:"paid",activated_at:new Date().toISOString(),expires_at:scenario==="expired"?new Date(0).toISOString():null,revoked_at:scenario==="revoked"?new Date().toISOString():null}]);
   if(String(u).includes('/organization_memberships'))return Response.json(scenario==="nonmember"?[]:[{organization_id:"org"}]);
   storageCalled=true;return new Response("cached secret file");
  });
  assert.equal((await onRequestGet(ctx())).status,403);assert.equal(storageCalled,false);t.mock.restoreAll();
 }
});
test("original binary bytes retain their MIME and are not cached, framed or indexed",async()=>{
 const bytes=new TextEncoder().encode("%PDF-1.4 fixture");
 const hash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes))).map(b=>b.toString(16).padStart(2,"0")).join("");
 const material={key:"sample-report.pdf",contentType:"application/pdf",bytes:bytes.length,sha256:hash};
 const r=await protectedMaterialResponse(bytes.buffer,material);assert.equal(r.status,200);assert.equal(r.headers.get("Content-Type"),"application/pdf");
 assert.match(r.headers.get("Cache-Control")||"",/no-store, no-transform/);assert.equal(r.headers.get("X-Frame-Options"),"DENY");
 assert.match(r.headers.get("X-Robots-Tag")||"",/noindex/);assert.deepEqual(new Uint8Array(await r.arrayBuffer()),bytes);
 assert.equal((await protectedMaterialResponse(bytes.buffer,{...material,sha256:"0".repeat(64)})).status,503);
});
