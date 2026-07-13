import type { ChannelConfig } from '../core/types';
import type { Adapter } from '../core/adapters';

declare global {
  interface Window {
    emailjs?: any;
  }
}

let emailjsSDK: any = null;

export const EmailJSAdapter: Adapter = {
  async loadSDK(): Promise<any> {
    if (emailjsSDK) return emailjsSDK;
    if (typeof window !== 'undefined' && window.emailjs) {
      emailjsSDK = window.emailjs;
      return emailjsSDK;
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.onload = () => {
        emailjsSDK = window.emailjs;
        resolve(emailjsSDK);
      };
      script.onerror = () => reject(new Error('Failed to load EmailJS SDK'));
      document.head.appendChild(script);
    });
  },

  async send(config: ChannelConfig, formData: FormData): Promise<any> {
    if (!config.publicKey || !config.serviceId || !config.templateId) {
      throw new Error('EmailJS: publicKey, serviceId, and templateId are required');
    }
    const sdk = await this.loadSDK();
    sdk.init(config.publicKey);
    const templateParams: Record<string, any> = {};
    formData.forEach((value, key) => {
      templateParams[key] = value;
    });
    return sdk.send(config.serviceId, config.templateId, templateParams);
  },
};
