import type { ChannelConfig } from '../core/types';
import type { Adapter } from '../core/adapters';

export function createProxyAdapter(label: string): Adapter {
  return {
    async send(config: ChannelConfig, formData: FormData): Promise<any> {
      if (!config.proxyUrl) throw new Error(`${label}: proxyUrl is required`);
      const method = (config.method || 'POST').toUpperCase();
      const payload: Record<string, any> = {};

      if (config.bodyMapping && Object.keys(config.bodyMapping).length > 0) {
        for (const [targetKey, fieldName] of Object.entries(config.bodyMapping)) {
          payload[targetKey] = formData.get(fieldName) ?? '';
        }
      } else {
        formData.forEach((value, key) => {
          payload[key] = value;
        });
      }

      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(config.headers || {}),
        },
      };

      if (method !== 'GET' && method !== 'HEAD') {
        fetchOptions.body = JSON.stringify(payload);
      }

      const response = await fetch(config.proxyUrl, fetchOptions);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`${label} responded with ${response.status}: ${text}`);
      }
      const contentType = response.headers.get('content-type') || '';
      return contentType.includes('application/json') ? response.json() : response.text();
    },
  };
}
