import test from "node:test";
import assert from "node:assert/strict";
import {onRequestPost} from "../functions/api/auth/recover";
const request=()=>new Request("https://treehouse.test/api/auth/recover",{method:"POST",headers:{Origin:"https://treehouse.test","Content-Type":"application/json"},body:JSON.stringify({email:"user@example.com",locale:"ar"})});
test("recovery does not claim success for rejected SMTP delivery or invalid backend configuration",async t=>{
 for(const [status,code] of [[400,"email_address_not_authorized"],[401,"bad_jwt"],[429,"over_email_send_rate_limit"],[500,"unexpected_failure"]] as const){
  t.mock.method(globalThis,"fetch",async()=>Response.json({code},{status}));
  const r=await onRequestPost({request:request(),env:{}} as never);
  assert.equal(r.status,503);assert.deepEqual(await r.json(),{error:"authentication_unavailable"});
  t.mock.restoreAll();
 }
});
test("unknown-account and accepted recovery requests have the same public response and exact canonical callback",async t=>{
 for(const unknown of [false,true]){
  t.mock.method(globalThis,"fetch",async (u:string)=>{
   const url=new URL(u);assert.equal(url.searchParams.get("redirect_to"),"https://treehouse.test/ar/client/reset-password/");
   return unknown?Response.json({code:"user_not_found"},{status:404}):Response.json({});
  });
  const r=await onRequestPost({request:request(),env:{}} as never);assert.equal(r.status,200);assert.deepEqual(await r.json(),{ok:true});
  t.mock.restoreAll();
 }
});
