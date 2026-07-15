# LowNoise Contact Suite

Multichannel contact framework – plug & play, no backend required.  
Supports **WhatsApp**, **EmailJS**, **Discord**, **Telegram**, **Slack**, **Webhooks** and more.

## Features

- Zero runtime dependencies
- Multi-channel contact form with channel toggle UI
- Form validation (required, email, tel, custom regex/async)
- Anti-spam (honeypot + minimum time)
- Internationalization (ES, EN, FR, DE)
- Dark mode & customizable theming via CSS custom properties
- Accessibility (ARIA, keyboard navigation, screen reader friendly)
- Two modes: auto-render or enhance existing HTML forms
- Serverless proxy templates for secure channels (Discord, Telegram, Slack)

## Installation

### CDN (desde GitHub)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Low-Noise-Organization/LowNoise_Contact_Suite@latest/low-noise-contact-suite.css">
<script src="https://cdn.jsdelivr.net/gh/Low-Noise-Organization/LowNoise_Contact_Suite@latest/dist/low-noise-contact-suite.js"></script>
```

### CDN + Auto-init (sin escribir JS)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Low-Noise-Organization/LowNoise_Contact_Suite@latest/low-noise-contact-suite.css">
<script src="https://cdn.jsdelivr.net/gh/Low-Noise-Organization/LowNoise_Contact_Suite@latest/dist/low-noise-contact-suite.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Low-Noise-Organization/LowNoise_Contact_Suite@latest/dist/vanilla-auto-init.js"></script>

<div data-lcs data-lcs-channels='[{"type":"whatsapp","number":"34123456789"}]'></div>
```

### npm (cuando esté publicado)
```bash
npm install low-noise-contact-suite
```

```js
import LowNoiseContactSuite from 'low-noise-contact-suite';
import 'low-noise-contact-suite/low-noise-contact-suite.css';
```

### GitHub directo (sin npm)
```bash
npm install github:Low-Noise-Organization/LowNoise_Contact_Suite
```

```js
import LowNoiseContactSuite from 'low-noise-contact-suite';
import 'low-noise-contact-suite/low-noise-contact-suite.css';
```

## Framework Support

### Vanilla JS (HTML/CSS/JS)

**Option A — Programmatic (recommended):**
```html
<div id="contact-form"></div>
<script src="https://cdn.jsdelivr.net/npm/low-noise-contact-suite/dist/low-noise-contact-suite.js"></script>
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

**Option B — Declarative (auto-init via data attributes):**
No JS needed. Load the auto-init script after the main bundle:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/low-noise-contact-suite/low-noise-contact-suite.css">
<script src="https://cdn.jsdelivr.net/npm/low-noise-contact-suite/dist/low-noise-contact-suite.js"></script>
<script src="https://cdn.jsdelivr.net/npm/low-noise-contact-suite/dist/vanilla-auto-init.js"></script>

<!-- Option B1: Inline JSON config -->
<div data-lcs data-lcs-channels='[{"type":"whatsapp","number":"34123456789"}]'></div>

<!-- Option B2: Per-channel data attributes -->
<div data-lcs data-lcs-channel-types="whatsapp,emailjs"
     data-lcs-whatsapp-number="34123456789"
     data-lcs-emailjs-public-key="YOUR_KEY"
     data-lcs-emailjs-service-id="SERVICE_ID"
     data-lcs-emailjs-template-id="TEMPLATE_ID"></div>

<!-- Option B3: External JSON config -->
<div data-lcs data-lcs-config="/config/contact.json"></div>
```

### React

**`<ContactSuite>` component:**
```tsx
import { ContactSuite } from 'low-noise-contact-suite/react';
import 'low-noise-contact-suite/low-noise-contact-suite.css';

export default function ContactPage() {
  return (
    <ContactSuite
      channels={[
        { type: 'whatsapp', number: '34123456789' },
        { type: 'emailjs', publicKey: '...', serviceId: '...', templateId: '...' }
      ]}
      onSuccess={(channel, res) => console.log('Sent via', channel)}
    />
  );
}
```

**`useContactSuite` hook (for custom layouts):**
```tsx
import { useRef } from 'react';
import { useContactSuite } from 'low-noise-contact-suite/react';
import 'low-noise-contact-suite/low-noise-contact-suite.css';

export default function CustomContact() {
  const ref = useRef<HTMLDivElement>(null);
  const { setChannel, reset } = useContactSuite({
    container: ref.current,
    channels: [{ type: 'whatsapp', number: '34123456789' }],
  });

  return (
    <div>
      <button onClick={() => setChannel('whatsapp')}>Switch</button>
      <button onClick={reset}>Reset</button>
      <div ref={ref} />
    </div>
  );
}
```

### Angular

**Standalone component (Angular 14+):**
```typescript
import { Component } from '@angular/core';
import { ContactSuiteComponent } from 'low-noise-contact-suite/angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactSuiteComponent],
  template: `
    <lib-contact-suite
      [channels]="channels"
      (onSuccess)="handleSuccess($event)">
    </lib-contact-suite>
  `,
})
export class ContactComponent {
  channels = [
    { type: 'whatsapp', number: '34123456789' } as const,
    { type: 'emailjs', publicKey: '...', serviceId: '...', templateId: '...' } as const,
  ];

  handleSuccess(event: any) {
    console.log('Sent!', event);
  }
}
```

**With NgModule:**
```typescript
import { NgModule } from '@angular/core';
import { ContactSuiteModule } from 'low-noise-contact-suite/angular';

@NgModule({
  imports: [ContactSuiteModule],
})
export class AppModule {}
```

## Configuration

### `ContactSuiteConfig`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `container` | `string \| HTMLElement` | — | CSS selector or element reference for the form container |
| `channels` | `ChannelConfig[]` | — | Channel configurations (at least 1 required) |
| `fields` | `FieldConfig[]` | `[name, email, message]` | Form field definitions |
| `ui` | `UIConfig` | — | UI customization options |
| `antispam` | `AntispamConfig` | `{ honeypot: true, minTime: 3 }` | Anti-spam configuration |
| `i18n` | `I18nConfig` | Auto-detected | Language and translation overrides |
| `onBeforeSubmit` | `(channel, formData) => boolean \| void` | — | Global pre-submit hook |
| `onSuccess` | `(channel, response, formData) => void` | — | Global success callback |
| `onError` | `(channel, error, formData) => void` | — | Global error callback |
| `onChannelChange` | `(channel) => void` | — | Global channel switch callback |

### `ChannelConfig`

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'whatsapp' \| 'emailjs' \| 'discord' \| 'telegram' \| 'slack' \| 'webhook'` | Channel identifier |
| `number` | `string` | WhatsApp phone number (WhatsApp only) |
| `messageTemplate` | `string` | Template with `{fieldName}` placeholders (WhatsApp only) |
| `publicKey` | `string` | EmailJS public key (EmailJS only) |
| `serviceId` | `string` | EmailJS service ID (EmailJS only) |
| `templateId` | `string` | EmailJS template ID (EmailJS only) |
| `proxyUrl` | `string` | Proxy/serverless worker URL (Discord, Telegram, Slack, Webhook) |
| `method` | `string` | HTTP method for proxy (default: `POST`) |
| `headers` | `Record<string, string>` | Custom headers for proxy request |
| `bodyMapping` | `Record<string, string>` | Map form fields to different payload keys |
| Per-channel callbacks | Same as global | Callbacks specific to this channel |

### `FieldConfig`

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Field name (used as FormData key) |
| `type` | `'text' \| 'email' \| 'tel' \| 'textarea' \| 'select' \| 'hidden'` | Input type |
| `label` | `string` | Display label |
| `placeholder` | `string` | Placeholder text |
| `required` | `boolean` | Whether field is required |
| `channels` | `ChannelType[]` | Restrict field to specific channels |
| `options` | `{ value, label }[]` | Options for select type |
| `validation` | `RegExp \| (value) => boolean \| string \| Promise` | Custom validation |
| `errorMessage` | `string` | Custom error message for validation failure |

### `UIConfig`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `theme` | `'default' \| 'minimal' \| false` | `'default'` | Visual theme (false = no theme class) |
| `toggleChannel` | `boolean` | `true` if >1 channel | Show/hide the channel toggle |
| `resetOnSuccess` | `boolean` | `true` | Reset form after successful submission |
| `btnText` | `string` | Per-channel default | Custom submit button text |

### `AntispamConfig`

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `honeypot` | `boolean` | `true` | Hidden field trap for bots |
| `minTime` | `number` | `3` | Minimum seconds before form can be submitted |

### `I18nConfig`

| Property | Type | Description |
|----------|------|-------------|
| `lang` | `string` | Force language (`'es'`, `'en'`, `'fr'`, `'de'`) |
| `overrides` | `Partial<I18nStrings>` | Custom translation overrides |

## Examples

### WhatsApp Only
```js
new LowNoiseContactSuite({
  container: '#contact',
  channels: [{ type: 'whatsapp', number: '34123456789' }],
  ui: { toggleChannel: false }
});
```

### EmailJS Only
```js
new LowNoiseContactSuite({
  container: '#contact',
  channels: [{
    type: 'emailjs',
    publicKey: 'YOUR_PUBLIC_KEY',
    serviceId: 'YOUR_SERVICE_ID',
    templateId: 'YOUR_TEMPLATE_ID'
  }]
});
```

### Discord with Proxy
```js
new LowNoiseContactSuite({
  container: '#contact',
  channels: [{
    type: 'discord',
    proxyUrl: 'https://your-worker.workers.dev'
  }]
});
```

### Custom Fields with Channel Filtering
```js
new LowNoiseContactSuite({
  container: '#contact',
  channels: [
    { type: 'whatsapp', number: '34123456789' },
    { type: 'emailjs', publicKey: '...', serviceId: '...', templateId: '...' }
  ],
  fields: [
    { name: 'name', type: 'text', label: 'Name', required: true },
    { name: 'email', type: 'email', label: 'Email', required: true, channels: ['emailjs'] },
    { name: 'phone', type: 'tel', label: 'Phone', channels: ['whatsapp'] },
    { name: 'subject', type: 'select', label: 'Subject', options: [
      { value: 'support', label: 'Support' },
      { value: 'sales', label: 'Sales' }
    ]},
    { name: 'message', type: 'textarea', label: 'Message', required: true }
  ]
});
```

### Custom Validation
```js
new LowNoiseContactSuite({
  container: '#contact',
  channels: [{ type: 'webhook', proxyUrl: '/api/contact' }],
  fields: [{
    name: 'age',
    type: 'text',
    label: 'Age',
    validation: value => {
      const num = parseInt(value, 10);
      return num >= 18 && num <= 120 ? true : 'Must be between 18 and 120';
    }
  }]
});
```

### Callbacks
```js
new LowNoiseContactSuite({
  container: '#contact',
  channels: [{ type: 'whatsapp', number: '34123456789' }],
  onBeforeSubmit: (channel, data) => {
    console.log('Submitting via', channel, data);
    return true;
  },
  onSuccess: (channel, response, data) => {
    console.log('Success!', channel, response);
  },
  onError: (channel, error, data) => {
    console.error('Error!', channel, error);
  },
  onChannelChange: channel => {
    console.log('Switched to', channel);
  }
});
```

## Public API

```js
const suite = new LowNoiseContactSuite({ ... });

suite.setChannel('whatsapp'); // Programmatically switch channel
suite.reset();                // Reset form to initial state
suite.destroy();              // Remove form and cleanup
```

## Public Methods

### `setChannel(channel: ChannelType)`
Switch the active channel programmatically.

### `reset()`
Reset the form fields, clear validation errors, and hide status messages.

### `destroy()`
Remove the form from the DOM and clean up event listeners.

## Serverless Proxies

For secure channels (Discord, Telegram, Slack), deploy the proxy workers from the `proxies/` folder:

- **Cloudflare Workers**: Copy `proxies/discord-worker.js`, `proxies/telegram-worker.js`, or `proxies/slack-worker.js`
- **Netlify Functions**: Adapt the worker as a serverless function
- **Vercel Edge Functions**: Adapt as needed

Set API tokens/secrets via environment variables (e.g., `DISCORD_WEBHOOK_URL`, `TELEGRAM_BOT_TOKEN`, `SLACK_WEBHOOK_URL`).

## Theming

Set the theme via `ui.theme`:
- `'default'` — Dark modern theme (default)
- `'minimal'` — Clean light theme
- `false` — No theme classes, style entirely from scratch

Override CSS custom properties:
```css
.lcs-root {
  --lcs-primary: #your-color;
  --lcs-bg: #your-bg;
  --lcs-text: #your-text;
  --lcs-radius: 8px;
}
```

## Internationalization

Auto-detects browser language (ES, EN, FR, DE). Override explicitly:
```js
new LowNoiseContactSuite({
  container: '#contact',
  channels: [{ type: 'whatsapp', number: '34123456789' }],
  i18n: {
    lang: 'fr',
    overrides: {
      btnDefault: 'Envoyer',
      successDefault: 'Message envoyé!'
    }
  }
});
```

## License

MIT
