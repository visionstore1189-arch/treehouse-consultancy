import test from "node:test";
import assert from "node:assert/strict";
import { describeDemoAccess, type DemoGrant } from "../functions/api/auth/_demo-access";
const now=Date.parse("2026-11-17T12:00:00Z");
const trial: DemoGrant={access_kind:"trial",activated_at:"2026-11-16T12:00:00Z",expires_at:"2026-11-17T12:00:00Z",revoked_at:null};
test("trial access stops at the exact deadline regardless of an authenticated session",()=>{
 assert.equal(describeDemoAccess(trial,true,now-1)?.active,true);
 assert.equal(describeDemoAccess(trial,true,now)?.active,false);
 assert.equal(describeDemoAccess(trial,true,now+1)?.state,"expired");
});
test("pending trial has no access and does not gain a deadline from the browser",()=>{
 const access=describeDemoAccess({...trial,activated_at:null,expires_at:null},true,now);
 assert.equal(access?.active,false);assert.equal(access?.state,"pending");assert.equal(access?.expiresAt,null);
});
test("paid grants may be unbounded but revocation, expiry and membership still apply",()=>{
 const paid: DemoGrant={...trial,access_kind:"paid",expires_at:null};
 assert.equal(describeDemoAccess(paid,true,now)?.active,true);
 assert.equal(describeDemoAccess(paid,false,now)?.active,false);
 assert.equal(describeDemoAccess({...paid,revoked_at:new Date(now).toISOString()},true,now)?.active,false);
 assert.equal(describeDemoAccess({...paid,expires_at:new Date(now).toISOString()},true,now)?.active,false);
});
