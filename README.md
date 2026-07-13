# LowNoise Contact Suite

Multichannel contact framework – plug & play, sin backend requerido.  
Incluye WhatsApp, EmailJS, Discord, Telegram, Slack, Webhooks y más.

## Instalación

### CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/low-noise-contact-suite/low-noise-contact-suite.css">
<script src="https://cdn.jsdelivr.net/npm/low-noise-contact-suite/dist/low-noise-contact-suite.min.js"></script>
```
### npm
```bash
npm install low-noise-contact-suite
```
### js

```js
import LowNoiseContactSuite from 'low-noise-contact-suite';
import 'low-noise-contact-suite/low-noise-contact-suite.css';
```
## Uso rápido
```html

<div id="contact-form"></div>
<script>
  new LowNoiseContactSuite({
    container: '#contact-form',
    channels: [
      { type: 'whatsapp', number: '34123456789' },
      { type: 'emailjs', publicKey: 'YOUR_KEY', serviceId: 'SERVICE_ID', templateId: 'TEMPLATE_ID' }
    ]
  });
</script>
```
## Configuración

Consulta la documentación completa para todos los canales, campos personalizados, temas y callbacks.
Proxies serverless

Para canales seguros (Discord, Telegram, Slack), despliega los proxies incluidos en la carpeta proxies/ en Cloudflare Workers o Netlify Functions.
## Licencia

MIT
