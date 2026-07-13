export type ChannelType = 'whatsapp' | 'emailjs' | 'discord' | 'telegram' | 'slack' | 'webhook';
export interface ChannelConfig {
    type: ChannelType;
    number?: string;
    messageTemplate?: string;
    publicKey?: string;
    serviceId?: string;
    templateId?: string;
    proxyUrl?: string;
    method?: string;
    headers?: Record<string, string>;
    bodyMapping?: Record<string, string>;
    onBeforeSubmit?: (channel: string, formData: FormData) => boolean | void;
    onSuccess?: (channel: string, response: any, formData: FormData) => void;
    onError?: (channel: string, error: Error, formData: FormData) => void;
    onChannelChange?: (channel: string) => void;
}
export interface FieldConfig {
    name: string;
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'hidden';
    label?: string;
    placeholder?: string;
    required?: boolean;
    channels?: ChannelType[];
    options?: {
        value: string;
        label: string;
    }[];
    validation?: RegExp | ((value: string) => boolean | string | Promise<boolean | string>);
    errorMessage?: string;
}
export interface UIConfig {
    theme?: 'default' | 'minimal' | false;
    toggleChannel?: boolean;
    resetOnSuccess?: boolean;
    btnText?: string;
}
export interface AntispamConfig {
    honeypot?: boolean;
    minTime?: number;
}
export interface I18nStrings {
    [key: string]: string;
}
export interface ContactSuiteConfig {
    container: string | HTMLElement;
    channels: ChannelConfig[];
    fields?: FieldConfig[];
    ui?: UIConfig;
    antispam?: AntispamConfig;
    i18n?: Partial<I18nStrings>;
    onBeforeSubmit?: (channel: string, formData: FormData) => boolean | void;
    onSuccess?: (channel: string, response: any, formData: FormData) => void;
    onError?: (channel: string, error: Error, formData: FormData) => void;
    onChannelChange?: (channel: string) => void;
}
