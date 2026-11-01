// Temporary diagnostic: report binding presence AND usability (names/types only, never values).
// Remove after the KV binding issue is resolved.
export async function onRequest(context) {
  const env = context.env || {};
  const kv = env.FIXINGS_PUBLIC;
  const out = {
    keys: Object.keys(env).sort(),
    hasKV: !!kv,
    kvType: typeof kv,
    hasGet: !!(kv && typeof kv.get === "function"),
    hasPut: !!(kv && typeof kv.put === "function"),
  };
  try {
    const v = kv ? await kv.get("public") : null;
    out.kvGetPublic = v === null ? null : typeof v;
  } catch (e) {
    out.kvGetError = e && e.message ? e.message : String(e);
  }
  return new Response(JSON.stringify(out), {
    headers: { "content-type": "application/json" },
  });
}
