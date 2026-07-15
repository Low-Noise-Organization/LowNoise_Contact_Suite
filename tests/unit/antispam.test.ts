import { LowNoiseContactSuite } from '../../src/core/LowNoiseContactSuite';

describe('Antispam', () => {
  let instance: LowNoiseContactSuite;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    instance = new LowNoiseContactSuite({
      container: '#root',
      channels: [{ type: 'webhook', proxyUrl: 'http://test' }],
      antispam: { honeypot: true, minTime: 3 },
    });
  });

  afterEach(() => instance.destroy());

  it('bloquea si el honeypot está relleno', () => {
    const formData = new FormData();
    formData.append((instance as any).honeypotName, 'bot');
    expect((instance as any).checkAntispam(formData)).toBe(false);
  });

  it('bloquea si se envía demasiado rápido', () => {
    (instance as any).loadTime = Date.now();
    const formData = new FormData();
    expect((instance as any).checkAntispam(formData)).toBe(false);
  });

  it('permite si pasa las comprobaciones', () => {
    (instance as any).loadTime = Date.now() - 4000;
    const formData = new FormData();
    expect((instance as any).checkAntispam(formData)).toBe(true);
  });
});
