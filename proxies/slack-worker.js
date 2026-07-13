export default {
  async fetch(request) {
    const { name, email, message } = await request.json();
    await fetch('https://hooks.slack.com/services/T00/B00/xxxx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `*Nuevo mensaje de contacto*\n>👤 ${name}\n>📧 ${email}\n>📝 ${message}` })
    });
    return new Response(JSON.stringify({ ok: true }), { headers: { 'Content-Type': 'application/json' } });
  }
};
