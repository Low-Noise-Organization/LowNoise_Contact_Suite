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
    const webhookUrl = SLACK_WEBHOOK_URL; // Set via environment variable

    if (!webhookUrl) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const slackResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `*Nuevo mensaje de contacto*\n>👤 ${name || 'No especificado'}\n>📧 ${email || 'No especificado'}\n>📝 ${message || 'No especificado'}`,
      }),
    });

    if (!slackResponse.ok) {
      const text = await slackResponse.text();
      return new Response(JSON.stringify({ error: `Slack API error: ${text}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
