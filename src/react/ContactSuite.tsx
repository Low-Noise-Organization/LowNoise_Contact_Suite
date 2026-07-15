import { useRef, type CSSProperties } from 'react';
import { useContactSuite } from './useContactSuite';
import type { ContactSuiteConfig } from '../core/types';

export interface ContactSuiteProps extends Omit<ContactSuiteConfig, 'container'> {
  className?: string;
  style?: CSSProperties;
}

export function ContactSuite({
  className,
  style,
  channels,
  fields,
  ui,
  antispam,
  i18n,
  onBeforeSubmit,
  onSuccess,
  onError,
  onChannelChange,
}: ContactSuiteProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useContactSuite({
    container: containerRef.current,
    channels,
    fields,
    ui,
    antispam,
    i18n,
    onBeforeSubmit,
    onSuccess,
    onError,
    onChannelChange,
  });

  return <div ref={containerRef} className={className} style={style} />;
}
