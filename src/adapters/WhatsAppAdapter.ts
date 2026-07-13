import type { ChannelConfig } from '../core/types';
import type { Adapter } from '../core/adapters';

export const WhatsAppAdapter: Adapter = {
  send(config: ChannelConfig, formData: FormData): Promise<{ opened: boolean }> {
    if (!config.number) throw new Error('WhatsApp: number is required');
    const number = config.number.replace(/\D/g, '');
    let template = config.messageTemplate || 'Hola, soy {name}. {message}';
    for (const [key, value] of formData.entries()) {
      template = template.replace(new RegExp(`\\{${key}\\}`, 'g'), encodeURIComponent(value as string));
    }
    const url = `https://wa.me/${number}?text=${encodeURIComponent(template)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    return Promise.resolve({ opened: true });
  },
};
