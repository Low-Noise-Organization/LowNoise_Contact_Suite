export default {
  async fetch(request) {
    const p = await request.json();
    const text = `📩 *Nuevo mensaje*\n👤 ${p.name}\n📧 ${p.email}\n📝 ${p.message}`;
    await fetch(`https://api.telegram.org/bot<TOKEN>/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: '<CHAT_ID>', text, parse_mode: 'Markdown' })
    });
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  }
};
