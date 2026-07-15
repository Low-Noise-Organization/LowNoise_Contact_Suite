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

    const name = body.name || 'No especificado';
    const email = body.email || 'No especificado';
    const message = body.message || 'No especificado';
    const botToken = TELEGRAM_BOT_TOKEN; // Set via environment variable
    const chatId = TELEGRAM_CHAT_ID;     // Set via environment variable

    if (!botToken || !chatId) {
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const text = `📩 *Nuevo mensaje*\n👤 ${name}\n📧 ${email}\n📝 ${message}`;
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
        }),
      },
    );

    if (!telegramResponse.ok) {
      const errText = await telegramResponse.text();
      return new Response(JSON.stringify({ error: `Telegram API error: ${errText}` }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
