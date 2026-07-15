/**
 * Auto-initialisation for Vanilla JS.
 *
 * Load this script after the main bundle to initialise forms
 * declaratively via the `data-lcs` attribute:
 *
 * ```html
 * <div
 *   data-lcs
 *   data-lcs-channels='[{"type":"whatsapp","number":"34123456789"}]'
 * ></div>
 * ```
 *
 * Or reference an external JSON config via `data-lcs-config`:
 *
 * ```html
 * <div data-lcs data-lcs-config="/config/contact.json"></div>
 * ```
 */

import { LowNoiseContactSuite } from '../core/LowNoiseContactSuite';
import type { ContactSuiteConfig, ChannelType, FieldConfig, UIConfig, AntispamConfig, I18nConfig } from '../core/types';

function parseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    console.warn('[LowNoiseContactSuite] Invalid JSON in data-lcs attribute:', raw);
    return fallback;
  }
}

function autoInit(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-lcs]');

  elements.forEach(el => {
    if (el.hasAttribute('data-lcs-initialized')) return;
    el.setAttribute('data-lcs-initialized', '');

    const configUrl = el.getAttribute('data-lcs-config');

    const apply = (channels: ContactSuiteConfig['channels']) => {
      const fields = parseJSON<FieldConfig[] | undefined>(
        el.getAttribute('data-lcs-fields'),
        undefined,
      );

      const uiRaw = el.getAttribute('data-lcs-ui');
      const ui = uiRaw ? parseJSON<UIConfig>(uiRaw, {}) : undefined;

      const antispamRaw = el.getAttribute('data-lcs-antispam');
      const antispam = antispamRaw ? parseJSON<AntispamConfig>(antispamRaw, {}) : undefined;

      const i18nRaw = el.getAttribute('data-lcs-i18n');
      const i18n = i18nRaw ? parseJSON<I18nConfig>(i18nRaw, {}) : undefined;

      const onBeforeSubmitRaw = el.getAttribute('data-lcs-onbeforesubmit');
      const onSuccessRaw = el.getAttribute('data-lcs-onsuccess');
      const onErrorRaw = el.getAttribute('data-lcs-onerror');
      const onChannelChangeRaw = el.getAttribute('data-lcs-onchannelchange');

      const config: ContactSuiteConfig = {
        container: el,
        channels,
        fields,
        ui,
        antispam,
        i18n,
      };

      if (onBeforeSubmitRaw && typeof (window as any)[onBeforeSubmitRaw] === 'function') {
        config.onBeforeSubmit = (window as any)[onBeforeSubmitRaw];
      }
      if (onSuccessRaw && typeof (window as any)[onSuccessRaw] === 'function') {
        config.onSuccess = (window as any)[onSuccessRaw];
      }
      if (onErrorRaw && typeof (window as any)[onErrorRaw] === 'function') {
        config.onError = (window as any)[onErrorRaw];
      }
      if (onChannelChangeRaw && typeof (window as any)[onChannelChangeRaw] === 'function') {
        config.onChannelChange = (window as any)[onChannelChangeRaw];
      }

      new LowNoiseContactSuite(config);
    };

    const inlineChannels = el.getAttribute('data-lcs-channels');
    if (inlineChannels) {
      apply(parseJSON<ContactSuiteConfig['channels']>(inlineChannels, []));
    } else if (configUrl) {
      fetch(configUrl)
        .then(res => res.json())
        .then((data: Partial<ContactSuiteConfig>) => apply(data.channels || []))
        .catch(err =>
          console.warn('[LowNoiseContactSuite] Failed to fetch config:', err),
        );
    } else {
      const channelTypes = (el.getAttribute('data-lcs-channel-types') || 'whatsapp')
        .split(',')
        .map(s => s.trim()) as ChannelType[];

      const channels = channelTypes.map(type => {
        const prefix = `data-lcs-${type}-`;
        const base: any = { type };

        if (type === 'whatsapp') {
          base.number = el.getAttribute(`${prefix}number`) || '';
          base.messageTemplate = el.getAttribute(`${prefix}template`) || undefined;
        } else if (type === 'emailjs') {
          base.publicKey = el.getAttribute(`${prefix}public-key`) || '';
          base.serviceId = el.getAttribute(`${prefix}service-id`) || '';
          base.templateId = el.getAttribute(`${prefix}template-id`) || '';
        } else {
          base.proxyUrl = el.getAttribute(`${prefix}proxy-url`) || '';
        }

        return base;
      });

      apply(channels);
    }
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }
}

export default autoInit;
