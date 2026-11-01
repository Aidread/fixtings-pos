// Temporary diagnostic: list environment binding NAMES only (never values).
// Remove after the KV binding issue is resolved.
export async function onRequest(context) {
  const keys = Object.keys(context.env || {}).sort();
  return new Response(JSON.stringify({ keys }), {
    headers: { "content-type": "application/json" },
  });
}
