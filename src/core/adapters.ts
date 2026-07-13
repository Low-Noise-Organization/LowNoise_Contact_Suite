import type { ChannelConfig } from './types';

export interface Adapter {
  send(channelConfig: ChannelConfig, formData: FormData): Promise<any>;
  loadSDK?(): Promise<any>;
}

export const adapters: Record<string, Adapter> = {};
