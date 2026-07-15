import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import LowNoiseContactSuite from 'low-noise-contact-suite';
import type { ContactSuiteConfig, ChannelType } from 'low-noise-contact-suite';

@Component({
  selector: 'lib-contact-suite',
  standalone: true,
  template: '<div #container></div>',
})
export class ContactSuiteComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  @Input() channels!: ContactSuiteConfig['channels'];
  @Input() fields?: ContactSuiteConfig['fields'];
  @Input() ui?: ContactSuiteConfig['ui'];
  @Input() antispam?: ContactSuiteConfig['antispam'];
  @Input() i18n?: ContactSuiteConfig['i18n'];
  @Input() onBeforeSubmit?: ContactSuiteConfig['onBeforeSubmit'];
  @Input() onSuccess?: ContactSuiteConfig['onSuccess'];
  @Input() onError?: ContactSuiteConfig['onError'];
  @Input() onChannelChange?: ContactSuiteConfig['onChannelChange'];

  private suite: LowNoiseContactSuite | null = null;

  ngOnInit(): void {
    if (!this.channels?.length) {
      console.warn('ContactSuiteComponent: at least one channel is required');
      return;
    }

    this.suite = new LowNoiseContactSuite({
      container: this.container.nativeElement,
      channels: this.channels,
      fields: this.fields,
      ui: this.ui,
      antispam: this.antispam,
      i18n: this.i18n,
      onBeforeSubmit: this.onBeforeSubmit,
      onSuccess: this.onSuccess,
      onError: this.onError,
      onChannelChange: this.onChannelChange,
    });
  }

  setChannel(channel: ChannelType): void {
    this.suite?.setChannel(channel);
  }

  reset(): void {
    this.suite?.reset();
  }

  ngOnDestroy(): void {
    this.suite?.destroy();
    this.suite = null;
  }
}
