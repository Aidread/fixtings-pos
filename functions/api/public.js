export async function onRequest(context) {
  try {
    if (context.request.method !== "GET") {
      return new Response(JSON.stringify({ ok: false, error: "method not allowed" }), {
        status: 405,
        headers: { "content-type": "application/json" },
      });
    }

    const empty = { phones: [], services: [], tickets: [], updatedAt: null };

    const kv = context.env.FIXTINGS_PUBLIC;
    if (!kv) {
      return new Response(JSON.stringify(empty), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const raw = await kv.get("public");
    if (!raw) {
      return new Response(JSON.stringify(empty), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    let stored;
    try {
      stored = JSON.parse(raw);
    } catch (_e) {
      return new Response(JSON.stringify(empty), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    const out = {
      phones: Array.isArray(stored.phones) ? stored.phones : [],
      services: Array.isArray(stored.services) ? stored.services : [],
      tickets: Array.isArray(stored.tickets) ? stored.tickets : [],
      updatedAt: typeof stored.updatedAt === "string" ? stored.updatedAt : null,
    };

    return new Response(JSON.stringify(out), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ phones: [], services: [], tickets: [], updatedAt: null }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
}
