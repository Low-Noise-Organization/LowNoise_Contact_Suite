# Proxies serverless para canales seguros

Estos proxies permiten conectar canales como Discord, Telegram y Slack sin exponer tokens en el frontend.

## Despliegue en Cloudflare Workers

1. Copia el contenido del archivo correspondiente (ej. `discord-worker.js`).
2. Crea un nuevo Worker en el dashboard de Cloudflare.
3. Pega el código y reemplaza los placeholders (`ID`, `TOKEN`, `<CHAT_ID>`, etc.) con tus credenciales.
4. Despliega y copia la URL generada (ej. `https://mi-proxy.workers.dev`).
5. Usa esa URL como `proxyUrl` en la configuración del canal.

## Despliegue en Netlify Functions

1. Crea una función en `netlify/functions/discord.js` con el mismo código, adaptándolo al formato de Netlify (export async function handler(event) { ... }).
2. Despliega en Netlify y usa la URL proporcionada.
