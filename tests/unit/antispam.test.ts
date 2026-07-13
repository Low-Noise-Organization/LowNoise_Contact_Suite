describe('Antispam', () => {
  let instance: any;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    instance = new (require('../../src/core/LowNoiseContactSuite').LowNoiseContactSuite)({
      container: '#root',
      channels: [{ type: 'webhook', proxyUrl: 'http://test' }],
      antispam: { honeypot: true, minTime: 3 },
    });
  });

  afterEach(() => instance.destroy());

  it('bloquea si el honeypot está relleno', () => {
    const formData = new FormData();
    formData.append(instance.honeypotName, 'bot');
    expect(instance.checkAntispam(formData)).toBe(false);
  });

  it('bloquea si se envía demasiado rápido', () => {
    instance.loadTime = Date.now(); // menos de 3s
    const formData = new FormData();
    expect(instance.checkAntispam(formData)).toBe(false);
  });

  it('permite si pasa las comprobaciones', () => {
    instance.loadTime = Date.now() - 4000;
    const formData = new FormData();
    expect(instance.checkAntispam(formData)).toBe(true);
  });
});
