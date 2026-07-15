export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, message } = body;

    if (!name || !message) {
      return new Response(JSON.stringify({ error: 'name and message are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const webhookUrl = DISCORD_WEBHOOK_URL; // Set via environment variable

    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `**Nuevo mensaje**\n👤 ${name}\n📧 ${email || 'No especificado'}\n📝 ${message}`,
      }),
    });

    if (!discordResponse.ok) {
      const text = await discordResponse.text();
      return new Response(JSON.stringify({ error: `Discord API error: ${text}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
