import { useEffect, useRef, useCallback } from 'react';
import { LowNoiseContactSuite } from '../core/LowNoiseContactSuite';
import type { ContactSuiteConfig, ChannelType } from '../core/types';

export interface UseContactSuiteOptions extends Omit<ContactSuiteConfig, 'container'> {
  container: string | HTMLElement | null;
}

export function useContactSuite(options: UseContactSuiteOptions) {
  const { container, ...config } = options;
  const suiteRef = useRef<LowNoiseContactSuite | null>(null);

  useEffect(() => {
    if (!container) return;

    suiteRef.current = new LowNoiseContactSuite({
      ...config,
      container,
    });

    return () => {
      suiteRef.current?.destroy();
      suiteRef.current = null;
    };
  }, [container]);

  const setChannel = useCallback((channel: ChannelType) => {
    suiteRef.current?.setChannel(channel);
  }, []);

  const reset = useCallback(() => {
    suiteRef.current?.reset();
  }, []);

  const destroy = useCallback(() => {
    suiteRef.current?.destroy();
    suiteRef.current = null;
  }, []);

  return { setChannel, reset, destroy };
}
