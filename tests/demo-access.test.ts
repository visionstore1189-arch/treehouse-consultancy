import test from "node:test";
import assert from "node:assert/strict";
import { onRequestGet } from "../functions/api/auth/demo";
const req = () => new Request("https://treehouse.test/api/auth/demo", {headers:{Cookie:"__Host-th_access=test-token"}});
const env = {};
test("demo bytes are never returned without a verified Supabase identity",async t=>{
 t.mock.method(globalThis,"fetch",async()=>Response.json({}, {status:401}));
 const r=await onRequestGet({request:req(),env} as never);
 assert.equal(r.status,401);assert.match(r.headers.get("Cache-Control")||"",/no-store/);
 assert.equal((await r.json() as {error:string}).error,"sign_in_required");
});
test("database denial does not leak HTML to an authenticated but ungranted identity",async t=>{
 t.mock.method(globalThis,"fetch",async u=>String(u).endsWith('/auth/v1/user')?Response.json({id:"user"}):Response.json([]));
 const r=await onRequestGet({request:req(),env} as never);assert.equal(r.status,403);
});
test("authorized original HTML is sandboxed, noncacheable and verified by SHA256",async t=>{
 const html="<!doctype html><title>Demo fixture</title>";
 const hash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(html)))).map(b=>b.toString(16).padStart(2,"0")).join("");
 t.mock.method(globalThis,"fetch",async u=>String(u).endsWith('/auth/v1/user')?Response.json({id:"user"}):Response.json([{html,sha256:hash}]));
 const r=await onRequestGet({request:req(),env} as never);assert.equal(r.status,200);assert.equal(await r.text(),html);
 assert.match(r.headers.get("Cache-Control")||"",/no-store, no-transform/);
 const csp=r.headers.get("Content-Security-Policy")||"";
 assert.match(csp,/sandbox allow-scripts/);assert.doesNotMatch(csp,/allow-same-origin/);assert.match(csp,/connect-src 'none'/);
});
test("modified demonstration fails closed",async t=>{
 t.mock.method(globalThis,"fetch",async u=>String(u).endsWith('/auth/v1/user')?Response.json({id:"user"}):Response.json([{html:"altered",sha256:"0".repeat(64)}]));
 assert.equal((await onRequestGet({request:req(),env} as never)).status,503);
});
