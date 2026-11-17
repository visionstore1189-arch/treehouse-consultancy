import { authEnabled, response, session, setTokens, supa, type AuthEnv } from "../_shared";
import { describeDemoAccess, type DemoGrant } from "../_demo-access";
import { protectedMaterials, type ProtectedMaterial } from "../_materials";
export const onRequestGet: PagesFunction<AuthEnv> = async ({request,env,params}) => {
  const id = typeof params.id === "string" ? params.id : "";
  if (!Object.hasOwn(protectedMaterials,id)) return response({error:"not_found"},404);
  const material=protectedMaterials[id as keyof typeof protectedMaterials];
  if (!authEnabled(env)) return response({error:"auth_not_configured"},503);
  const identity=await session(request,env);
  if (!identity) return response({error:"sign_in_required"},401);
  try {
    // Recheck current grant and membership before Storage fetch; never rely on its CDN cache for revocation.
    const [grantsRes,membersRes]=await Promise.all([
      supa(env,"/rest/v1/dawabit_demo_grants?select=access_kind,activated_at,expires_at,revoked_at&limit=1",{method:"GET"},identity.accessToken),
      supa(env,"/rest/v1/organization_memberships?select=organization_id&user_id=eq."+encodeURIComponent(identity.user.id)+"&status=eq.active&limit=1",{method:"GET"},identity.accessToken),
    ]);
    if (!grantsRes.ok || !membersRes.ok) return response({error:"access_records_unavailable"},503);
    const grants=await grantsRes.json() as DemoGrant[];
    const members=await membersRes.json() as unknown[];
    if (!describeDemoAccess(grants[0],members.length>0)?.active) return response({error:"resource_not_authorized"},403);
    const file=await supa(env,"/storage/v1/object/authenticated/dawabit-demo-private/"+material.key+"?cacheNonce="+Date.now(),{method:"GET"},identity.accessToken);
    if (!file.ok) return response({error:"resource_unavailable"},503);
    const result=await protectedMaterialResponse(await file.arrayBuffer(),material);
    if (result.ok && identity.tokens) setTokens(result,identity.tokens);
    return result;
  } catch { return response({error:"resource_unavailable"},503); }
};
export async function protectedMaterialResponse(bytes:ArrayBuffer,material:ProtectedMaterial) {
  if (bytes.byteLength!==material.bytes) return response({error:"resource_integrity_error"},503);
  const hash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",bytes))).map(b=>b.toString(16).padStart(2,"0")).join("");
  if(hash!==material.sha256) return response({error:"resource_integrity_error"},503);
  return new Response(bytes,{headers:{
    "Content-Type":material.contentType+(material.contentType==="text/html"?"; charset=utf-8":""),
    "Content-Disposition":`inline; filename="${material.key}"`,
    "Cache-Control":"private, no-store, no-transform, max-age=0",
    "X-Robots-Tag":"noindex, nofollow, noarchive",
    "X-Content-Type-Options":"nosniff",
    "X-Frame-Options":"DENY",
    "Referrer-Policy":"no-referrer",
    "Content-Security-Policy":material.contentType==="text/html"?
      "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'; sandbox allow-scripts allow-modals allow-downloads":
      "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
  }});
}
