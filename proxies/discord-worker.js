export default {
  async fetch(request) {
    const { name, email, message } = await request.json();
    await fetch('https://discord.com/api/webhooks/ID/TOKEN', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: `**Nuevo mensaje**\n👤 ${name}\n📧 ${email}\n📝 ${message}` })
    });
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  }
};
