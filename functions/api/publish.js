export async function onRequest(context) {
  try {
    if (context.request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "method not allowed" }), {
        status: 405,
        headers: { "content-type": "application/json" },
      });
    }

    const kv = context.env.FIXTINGS_PUBLIC;
    if (!kv) {
      return new Response(JSON.stringify({ ok: false, error: "KV not configured" }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }

    const body = await context.request.json();

    const key = body && body.key;
    if (typeof key !== "string" || key.length === 0 || key !== context.env.PUBLISH_KEY) {
      return new Response(JSON.stringify({ ok: false, error: "bad key" }), {
        status: 403,
        headers: { "content-type": "application/json" },
      });
    }

    const stored = {
      phones: Array.isArray(body.phones) ? body.phones : [],
      services: Array.isArray(body.services) ? body.services : [],
      tickets: Array.isArray(body.tickets) ? body.tickets : [],
      updatedAt: typeof body.updatedAt === "string" ? body.updatedAt : new Date().toISOString(),
    };

    await kv.put("public", JSON.stringify(stored));

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err && err.message ? err.message : String(err) }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
