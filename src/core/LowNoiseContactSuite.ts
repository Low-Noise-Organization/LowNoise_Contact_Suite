import type { ContactSuiteConfig, ChannelConfig, FieldConfig, ChannelType, UIConfig, AntispamConfig, I18nConfig } from './types';
import { resolveLanguage, defaultI18n } from './i18n';
import { adapters } from './adapters';
import { WhatsAppAdapter } from '../adapters/WhatsAppAdapter';
import { EmailJSAdapter } from '../adapters/EmailJSAdapter';
import { createProxyAdapter } from '../adapters/ProxyAdapter';

// Registro de adaptadores
adapters.whatsapp = WhatsAppAdapter;
adapters.emailjs = EmailJSAdapter;
adapters.discord = createProxyAdapter('Discord');
adapters.telegram = createProxyAdapter('Telegram');
adapters.slack = createProxyAdapter('Slack');
adapters.webhook = createProxyAdapter('Webhook');

const CHANNEL_META: Record<string, { color: string; icon: string }> = {
  whatsapp: {
    color: '#25D366',
    icon: '<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
  },
  emailjs: {
    color: '#EA4335',
    icon: '<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
  },
  discord: {
    color: '#5865F2',
    icon: '<svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.12-.098.246-.198.373-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>',
  },
  telegram: {
    color: '#26A5E4',
    icon: '<svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.46-1.901-.903-1.056-.692-1.653-1.123-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.009-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.12.098.153.23.169.323.016.093.036.307.02.474z"/></svg>',
  },
  slack: {
    color: '#4A154B',
    icon: '<svg viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.528 2.528 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>',
  },
  webhook: {
    color: '#6b7280',
    icon: '<svg viewBox="0 0 24 24"><path d="M18 13.18v-2.36c2.21.66 3.82 2.7 3.82 5.18 0 2.95-2.39 5.35-5.35 5.35-2.48 0-4.52-1.61-5.18-3.82h2.36c.55 1.11 1.65 1.82 2.82 1.82 1.8 0 3.35-1.55 3.35-3.35 0-1.17-.71-2.27-1.82-2.82zM6 10.82v2.36c-2.21-.66-3.82-2.7-3.82-5.18C2.18 5.05 4.57 2.65 7.53 2.65c2.48 0 4.52 1.61 5.18 3.82h-2.36c-.55-1.11-1.65-1.82-2.82-1.82-1.8 0-3.35 1.55-3.35 3.35 0 1.17.71 2.27 1.82 2.82zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>',
  },
};

interface InternalConfig {
  container: string | HTMLElement;
  channels: ChannelConfig[];
  fields: FieldConfig[];
  ui: UIConfig; // Cambio aquí: no Required
  antispam: Required<AntispamConfig>;
  i18n?: I18nConfig;
  onBeforeSubmit?: (channel: string, formData: FormData) => boolean | void;
  onSuccess?: (channel: string, response: any, formData: FormData) => void;
  onError?: (channel: string, error: Error, formData: FormData) => void;
  onChannelChange?: (channel: string) => void;
}

export class LowNoiseContactSuite {
  private config: InternalConfig;
  private container: HTMLElement;
  private currentChannel: ChannelType;
  private loadTime: number;
  private honeypotName: string;
  private isSubmitting = false;
  private isEnhanced: boolean;
  private formEl!: HTMLFormElement;
  private rootEl?: HTMLElement;
  private btnEl?: HTMLButtonElement;
  private statusEl?: HTMLDivElement;
  private i18n: Record<string, string>;
  private _updateSlider?: () => void;

  constructor(userConfig: ContactSuiteConfig) {
    this.config = this.normalizeConfig(userConfig);
    this.container = this.resolveContainer(this.config.container);
    this.currentChannel = this.config.channels[0].type;
    this.loadTime = Date.now();
    this.honeypotName = 'lcs_hp_' + Math.random().toString(36).substring(2);
    this.i18n = this.buildI18n();
    this.isEnhanced = this.detectMode();

    if (this.isEnhanced) {
      this.enhanceForm();
    } else {
      this.renderForm();
    }

    this.bindEvents();
    this.initToggle();
    this.updateChannelUI();
    this.applyTheme();
  }

  private normalizeConfig(cfg: ContactSuiteConfig): InternalConfig {
    const defaultFields: FieldConfig[] = [
      { name: 'name', type: 'text', label: 'Nombre', required: true },
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'message', type: 'textarea', label: 'Mensaje', required: true },
    ];
    return {
      container: cfg.container,
      channels: cfg.channels.length ? cfg.channels : [{ type: 'emailjs' }],
      fields: cfg.fields || defaultFields,
      ui: {
        theme: cfg.ui?.theme || 'default',
        toggleChannel: cfg.ui?.toggleChannel !== undefined ? cfg.ui.toggleChannel : cfg.channels.length > 1,
        resetOnSuccess: cfg.ui?.resetOnSuccess !== false,
        btnText: cfg.ui?.btnText, // puede ser undefined, ahora es válido
      },
      antispam: {
        honeypot: cfg.antispam?.honeypot !== false,
        minTime: cfg.antispam?.minTime || 3,
      },
      i18n: cfg.i18n, // ahora coincide con el tipo Partial<I18nStrings> | undefined
      onBeforeSubmit: cfg.onBeforeSubmit,
      onSuccess: cfg.onSuccess,
      onError: cfg.onError,
      onChannelChange: cfg.onChannelChange,
    };
  }

  private buildI18n(): Record<string, string> {
    const lang = resolveLanguage(this.config.i18n?.lang);
    const base = { ...defaultI18n[lang] };
    if (this.config.i18n?.overrides) {
      Object.entries(this.config.i18n.overrides).forEach(([key, value]) => {
        if (value !== undefined) {
          base[key] = value;
        }
      });
    }
    return base;
  }

  private resolveContainer(container: string | HTMLElement): HTMLElement {
    if (typeof container === 'string') {
      const el = document.querySelector(container);
      if (!el) throw new Error(`LowNoiseContactSuite: container "${container}" not found`);
      return el as HTMLElement;
    }
    return container;
  }

  private detectMode(): boolean {
    return this.container.tagName === 'FORM' || !!this.container.querySelector('form');
  }

  private applyTheme(): void {
    const theme = this.config.ui.theme;
    const root = this.rootEl || this.container;
    if (theme === 'minimal') {
      root.classList.add('lcs-theme-minimal');
    } else {
      root.classList.remove('lcs-theme-minimal');
    }
  }

  // ================== Modo Enhance ==================
  private enhanceForm(): void {
    this.formEl = this.container.tagName === 'FORM' ? (this.container as HTMLFormElement) : this.container.querySelector('form')!;
    this.formEl.setAttribute('novalidate', '');
    this.formEl.classList.add('lcs-form');
    this.rootEl = this.formEl.parentElement || this.container;

    if (this.config.ui.toggleChannel && this.config.channels.length > 1) {
      const toggle = this.buildToggle();
      this.formEl.parentNode?.insertBefore(toggle, this.formEl);
    }

    this.btnEl = this.formEl.querySelector('button[type="submit"], input[type="submit"]') as HTMLButtonElement;
    if (!this.btnEl) {
      this.btnEl = document.createElement('button');
      this.btnEl.type = 'submit';
      this.btnEl.className = 'lcs-btn';
      this.btnEl.textContent = this.config.ui.btnText || this.i18n.btnDefault;
      this.formEl.appendChild(this.btnEl);
    }

    this.statusEl = this.formEl.querySelector('.lcs-status') as HTMLDivElement;
    if (!this.statusEl) {
      this.statusEl = document.createElement('div');
      this.statusEl.className = 'lcs-status';
      this.statusEl.setAttribute('aria-live', 'polite');
      this.formEl.appendChild(this.statusEl);
    }

    if (this.config.antispam.honeypot && !this.formEl.querySelector(`[name="${this.honeypotName}"]`)) {
      const hp = document.createElement('div');
      hp.className = 'lcs-honeypot';
      hp.setAttribute('aria-hidden', 'true');
      hp.innerHTML = `<label for="${this.honeypotName}">Leave empty</label><input type="text" name="${this.honeypotName}" id="${this.honeypotName}" tabindex="-1" autocomplete="off">`;
      this.formEl.appendChild(hp);
    }

    // Mapear campos existentes
    this.config.fields.forEach(field => {
      const input = this.formEl.querySelector(`[name="${field.name}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (input) {
        input.required = field.required || false;
        if (field.placeholder && (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) {
          input.placeholder = field.placeholder;
        }
        if (field.channels) {
          input.setAttribute('data-channels', field.channels.join(','));
        }
        if (field.options && input instanceof HTMLSelectElement) {
          input.innerHTML = '';
          field.options.forEach(opt => {
            const optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.textContent = opt.label;
            input.appendChild(optionEl);
          });
        }
      }
    });
  }

  // ================== Renderizado ==================
  private renderForm(): void {
    const root = document.createElement('div');
    root.className = 'lcs-root';
    root.setAttribute('role', 'form');

    if (this.config.ui.toggleChannel && this.config.channels.length > 1) {
      root.appendChild(this.buildToggle());
    }

    this.formEl = document.createElement('form');
    this.formEl.className = 'lcs-form';
    this.formEl.noValidate = true;

    this.config.fields.forEach(field => {
      if (field.type === 'hidden') return;
      this.formEl.appendChild(this.buildField(field));
    });

    if (this.config.antispam.honeypot) {
      const hp = document.createElement('div');
      hp.className = 'lcs-honeypot';
      hp.setAttribute('aria-hidden', 'true');
      hp.innerHTML = `<label for="${this.honeypotName}">Leave empty</label><input type="text" name="${this.honeypotName}" id="${this.honeypotName}" tabindex="-1" autocomplete="off">`;
      this.formEl.appendChild(hp);
    }

    this.btnEl = document.createElement('button');
    this.btnEl.type = 'submit';
    this.btnEl.className = 'lcs-btn';
    this.btnEl.textContent = this.config.ui.btnText || this.i18n.btnDefault;
    this.formEl.appendChild(this.btnEl);

    this.statusEl = document.createElement('div');
    this.statusEl.className = 'lcs-status';
    this.statusEl.setAttribute('aria-live', 'polite');
    this.formEl.appendChild(this.statusEl);

    root.appendChild(this.formEl);
    this.container.innerHTML = '';
    this.container.appendChild(root);
    this.rootEl = root;
  }

  private buildToggle(): HTMLElement {
    const toggleDiv = document.createElement('div');
    toggleDiv.className = 'lcs-toggle';
    const track = document.createElement('div');
    track.className = 'lcs-toggle__track';

    this.config.channels.forEach(ch => {
      const meta = CHANNEL_META[ch.type] || CHANNEL_META.webhook;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lcs-toggle__option';
      btn.dataset.channel = ch.type;
      btn.setAttribute('role', 'switch');
      btn.setAttribute('aria-checked', 'false');
      btn.setAttribute('aria-label', `Switch to ${ch.type}`);
      btn.innerHTML = `<span class="lcs-toggle__icon">${meta.icon}</span><span>${ch.type}</span>`;
      track.appendChild(btn);
    });

    const slider = document.createElement('div');
    slider.className = 'lcs-toggle__slider';
    track.appendChild(slider);
    toggleDiv.appendChild(track);
    return toggleDiv;
  }

  private buildField(field: FieldConfig): HTMLElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'lcs-field';
    wrapper.dataset.fieldName = field.name;
    if (field.channels && field.channels.length > 0) {
      wrapper.dataset.channels = field.channels.join(',');
    }

    const label = document.createElement('label');
    label.className = 'lcs-field__label';
    label.setAttribute('for', `lcs-${field.name}`);
    label.innerHTML = `${field.label || field.name}${field.required ? '<span class="lcs-field__label-required">*</span>' : ''}`;
    wrapper.appendChild(label);

    let input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    if (field.type === 'textarea') {
      input = document.createElement('textarea');
      (input as HTMLTextAreaElement).rows = 4;
      input.className = 'lcs-field__textarea';
    } else if (field.type === 'select') {
      input = document.createElement('select');
      input.className = 'lcs-field__select';
      if (field.options) {
        field.options.forEach(opt => {
          const optionEl = document.createElement('option');
          optionEl.value = opt.value;
          optionEl.textContent = opt.label;
          (input as HTMLSelectElement).appendChild(optionEl);
        });
      }
    } else {
      input = document.createElement('input');
      input.className = 'lcs-field__input';
      input.type = field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text';
    }

    input.id = `lcs-${field.name}`;
    input.name = field.name;
    input.required = field.required || false;
    if (field.placeholder && (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement)) {
      input.placeholder = field.placeholder;
    }
    wrapper.appendChild(input);

    const errorEl = document.createElement('span');
    errorEl.className = 'lcs-field__error';
    errorEl.id = `lcs-error-${field.name}`;
    errorEl.setAttribute('role', 'alert');
    wrapper.appendChild(errorEl);

    return wrapper;
  }

  // ================== Toggle ==================
  private initToggle(): void {
    const track = this.rootEl?.querySelector('.lcs-toggle__track');
    if (!track) return;
    const slider = track.querySelector('.lcs-toggle__slider') as HTMLDivElement;
    const options = track.querySelectorAll('.lcs-toggle__option');

    const updateSlider = () => {
      const active = track.querySelector('.lcs-toggle__option--active') as HTMLElement;
      if (active && slider) {
        slider.style.left = active.offsetLeft + 'px';
        slider.style.width = active.offsetWidth + 'px';
        const meta = CHANNEL_META[this.currentChannel] || CHANNEL_META.webhook;
        slider.style.backgroundColor = meta.color;
      }
    };

    const setActive = (btn: Element) => {
      options.forEach(b => {
        b.classList.remove('lcs-toggle__option--active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('lcs-toggle__option--active');
      btn.setAttribute('aria-checked', 'true');
      updateSlider();
    };

    options.forEach(btn => {
      const handleSelect = () => {
        const ch = (btn as HTMLButtonElement).dataset.channel as ChannelType;
        if (ch === this.currentChannel) return;
        this.currentChannel = ch;
        setActive(btn);
        this.updateChannelUI();
        if (this.config.onChannelChange) this.config.onChannelChange(ch);
        const chCfg = this.config.channels.find(c => c.type === ch);
        if (chCfg?.onChannelChange) chCfg.onChannelChange(ch);
      };

      btn.addEventListener('click', handleSelect);
      btn.addEventListener('keydown', (e: Event) => {
        const keyboardEvent = e as KeyboardEvent;
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          e.preventDefault();
          handleSelect();
        }
      });
    });

    const first = track.querySelector(`[data-channel="${this.currentChannel}"]`);
    if (first) {
      setActive(first);
    }
    requestAnimationFrame(() => requestAnimationFrame(updateSlider));
    window.addEventListener('resize', updateSlider);
    this._updateSlider = updateSlider;
  }

  private updateChannelUI(): void {
    if (this.btnEl) {
      const btnMap: Record<string, string> = {
        whatsapp: this.i18n.btnWhatsapp,
        emailjs: this.i18n.btnEmail,
        discord: this.i18n.btnDiscord,
        telegram: this.i18n.btnTelegram,
        slack: this.i18n.btnSlack,
        webhook: this.i18n.btnWebhook,
      };
      this.btnEl.textContent = this.config.ui.btnText || btnMap[this.currentChannel] || this.i18n.btnDefault;
      this.btnEl.className = this.btnEl.className.replace(/lcs-btn--\w+/g, '').trim() + ' lcs-btn lcs-btn--' + this.currentChannel;
    }

    const fields = (this.rootEl || this.container).querySelectorAll('.lcs-field, [data-channels]');
    fields.forEach(el => {
      const dataset = (el as HTMLElement).dataset;
      if (dataset.channels) {
        const allowed = dataset.channels.split(',');
        const hidden = !allowed.includes(this.currentChannel);
        if (el.classList.contains('lcs-field')) {
          el.classList.toggle('lcs-field--hidden', hidden);
        } else {
          const input = el as HTMLElement;
          input.style.display = hidden ? 'none' : '';
          const label = document.querySelector(`label[for="${input.id}"]`) as HTMLElement;
          if (label) label.style.display = hidden ? 'none' : '';
          const parent = input.parentElement;
          if (parent && parent.tagName !== 'FORM' && !parent.classList.contains('lcs-field')) {
            parent.style.display = hidden ? 'none' : '';
          }
        }
      }
    });
  }

  // ================== Eventos ==================
  private bindEvents(): void {
    this.formEl.addEventListener('submit', e => {
      e.preventDefault();
      if (!this.isSubmitting) this.handleSubmit();
    });

    this.formEl.addEventListener('input', e => {
      const target = e.target as HTMLElement;
      if (target.closest('.lcs-field__input, .lcs-field__textarea, .lcs-field__select, input, textarea, select')) {
        target.classList.remove('lcs-field__input--error', 'lcs-field__textarea--error', 'lcs-field__select--error');
        const fieldWrapper = target.closest('.lcs-field');
        const errorEl = fieldWrapper?.querySelector('.lcs-field__error');
        if (errorEl) errorEl.classList.remove('lcs-field__error--visible');
      }
    });
  }

  // ================== Validación ==================
  private async validateField(field: FieldConfig, value: string): Promise<string | null> {
    if (field.required && !value.trim()) {
      return field.errorMessage || this.i18n.fieldRequired;
    }
    if (value && field.validation) {
      try {
        if (field.validation instanceof RegExp) {
          if (!field.validation.test(value)) return field.errorMessage || 'Invalid value';
        } else {
          const result = field.validation(value);
          const res = result instanceof Promise ? await result : result;
          if (res !== true) {
            return typeof res === 'string' ? res : (field.errorMessage || 'Invalid value');
          }
        }
      } catch {
        return field.errorMessage || 'Validation error';
      }
    }
    if (value && field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return field.errorMessage || this.i18n.fieldInvalidEmail;
    }
    if (value && field.type === 'tel' && !/^[+\d\s\-()]{7,20}$/.test(value)) {
      return field.errorMessage || this.i18n.fieldInvalidTel;
    }
    return null;
  }

  private async validateAll(): Promise<boolean> {
    let valid = true;
    const validations = this.config.fields.map(async field => {
      if (field.type === 'hidden') return;
      const input = this.formEl.querySelector(`[name="${field.name}"]`) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (!input || input.closest('.lcs-field--hidden') || input.style.display === 'none') return;
      const value = input.value;
      const error = await this.validateField(field, value);
      const wrapper = input.closest('.lcs-field') || input;
      const errorEl = (wrapper.querySelector?.('.lcs-field__error') || document.getElementById(`lcs-error-${field.name}`)) as HTMLElement;

      if (error) {
        valid = false;
        input.classList.add('lcs-field__input--error', 'lcs-field__textarea--error', 'lcs-field__select--error');
        if (errorEl) {
          errorEl.textContent = error;
          errorEl.classList.add('lcs-field__error--visible');
        }
        input.setAttribute('aria-describedby', errorEl?.id || '');
      } else {
        input.classList.remove('lcs-field__input--error', 'lcs-field__textarea--error', 'lcs-field__select--error');
        if (errorEl) {
          errorEl.textContent = '';
          errorEl.classList.remove('lcs-field__error--visible');
        }
        input.removeAttribute('aria-describedby');
      }
    });

    await Promise.all(validations);
    return valid;
  }

  // ================== Antispam ==================
  private checkAntispam(formData: FormData): boolean {
    if (this.config.antispam.honeypot) {
      const hpValue = formData.get(this.honeypotName);
      if (hpValue && (hpValue as string).trim().length > 0) {
        return false;
      }
    }
    const elapsed = (Date.now() - this.loadTime) / 1000;
    return elapsed >= this.config.antispam.minTime;
  }

  // ================== Envío ==================
  private async handleSubmit(): Promise<void> {
    this.hideStatus();
    if (!(await this.validateAll())) return;

    const formData = new FormData(this.formEl);
    if (!this.checkAntispam(formData)) {
      this.showStatus('error', this.i18n.errorSpam);
      return;
    }

    const channelConfig = this.config.channels.find(c => c.type === this.currentChannel);
    if (!channelConfig) {
      this.showStatus('error', 'Channel not configured');
      return;
    }

    if (this.config.onBeforeSubmit && this.config.onBeforeSubmit(this.currentChannel, formData) === false) return;
    if (channelConfig.onBeforeSubmit && channelConfig.onBeforeSubmit(this.currentChannel, formData) === false) return;

    this.setLoading(true);
    try {
      const adapter = adapters[this.currentChannel];
      if (!adapter) throw new Error(`Unknown channel: ${this.currentChannel}`);
      const response = await adapter.send(channelConfig, formData);
      this.showStatus('success', this.i18n.successDefault);
      if (this.config.ui.resetOnSuccess) {
        this.formEl.reset();
        this.clearErrors();
      }
      this.statusEl?.focus();
      if (this.config.onSuccess) this.config.onSuccess(this.currentChannel, response, formData);
      if (channelConfig.onSuccess) channelConfig.onSuccess(this.currentChannel, response, formData);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      this.showStatus('error', error.message);
      if (this.config.onError) this.config.onError(this.currentChannel, error, formData);
      if (channelConfig.onError) channelConfig.onError(this.currentChannel, error, formData);
    } finally {
      this.setLoading(false);
    }
  }

  private clearErrors(): void {
    this.formEl.querySelectorAll('.lcs-field__error--visible').forEach(el => el.classList.remove('lcs-field__error--visible'));
    this.formEl.querySelectorAll('.lcs-field__input--error, .lcs-field__textarea--error, .lcs-field__select--error').forEach(el => el.classList.remove('lcs-field__input--error', 'lcs-field__textarea--error', 'lcs-field__select--error'));
  }

  private showStatus(type: 'success' | 'error', message: string): void {
    if (!this.statusEl) return;
    this.statusEl.className = `lcs-status lcs-status--visible lcs-status--${type}`;
    const iconSvg = type === 'success'
      ? '<svg class="lcs-status__icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".2"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2"/></svg>'
      : '<svg class="lcs-status__icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor" opacity=".2"/><path d="M12 8v4m0 4h.01" stroke="currentColor" stroke-width="2"/></svg>';
    this.statusEl.innerHTML = iconSvg + '<span>' + message + '</span>';
  }

  private hideStatus(): void {
    if (this.statusEl) {
      this.statusEl.className = 'lcs-status';
      this.statusEl.innerHTML = '';
    }
  }

  private setLoading(loading: boolean): void {
    this.isSubmitting = loading;
    if (!this.btnEl) return;
    this.btnEl.disabled = loading;
    if (loading) {
      this.btnEl.setAttribute('data-original', this.btnEl.textContent || '');
      this.btnEl.innerHTML = '<span class="lcs-spinner"></span> Enviando...';
    } else {
      this.btnEl.textContent = this.btnEl.getAttribute('data-original') || this.btnEl.textContent;
      this.btnEl.querySelector('.lcs-spinner')?.remove();
    }
  }

  // ================== API pública ==================
  setChannel(channel: ChannelType): void {
    if (!this.config.channels.some(c => c.type === channel)) {
      console.warn(`Channel "${channel}" not configured`);
      return;
    }
    this.currentChannel = channel;
    this.updateChannelUI();
    const track = this.rootEl?.querySelector('.lcs-toggle__track');
    if (track) {
      track.querySelectorAll('.lcs-toggle__option').forEach(b => {
        b.classList.remove('lcs-toggle__option--active');
        b.setAttribute('aria-checked', 'false');
      });
      const activeBtn = track.querySelector(`[data-channel="${channel}"]`);
      if (activeBtn) {
        activeBtn.classList.add('lcs-toggle__option--active');
        activeBtn.setAttribute('aria-checked', 'true');
      }
      if (this._updateSlider) this._updateSlider();
    }
  }

  reset(): void {
    this.formEl?.reset();
    this.clearErrors();
    this.hideStatus();
  }

  destroy(): void {
    this.container.innerHTML = '';
    if (this._updateSlider) window.removeEventListener('resize', this._updateSlider);
  }
}
