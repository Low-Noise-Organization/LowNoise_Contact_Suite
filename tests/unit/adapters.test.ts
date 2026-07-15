import { WhatsAppAdapter } from '../../src/adapters/WhatsAppAdapter';
import { EmailJSAdapter } from '../../src/adapters/EmailJSAdapter';
import { createProxyAdapter } from '../../src/adapters/ProxyAdapter';

describe('WhatsApp Adapter', () => {
  it('debe abrir una nueva ventana con la URL correcta', () => {
    const openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    const config = { type: 'whatsapp', number: '34123456789', messageTemplate: 'Hola {name}' };
    const formData = new FormData();
    formData.append('name', 'Juan');
    WhatsAppAdapter.send(config as any, formData);
    expect(openSpy).toHaveBeenCalledWith(expect.stringContaining('https://wa.me/34123456789?text=Hola%20Juan'), '_blank', 'noopener,noreferrer');
    openSpy.mockRestore();
  });
});

describe('EmailJS Adapter', () => {
  it('debe cargar el SDK y llamar a send', async () => {
    const fakeSend = jest.fn().mockResolvedValue({ status: 200 });
    window.emailjs = {
      init: jest.fn(),
      send: fakeSend,
    };
    const config = { type: 'emailjs', publicKey: 'pk', serviceId: 'sid', templateId: 'tid' };
    const formData = new FormData();
    formData.append('msg', 'Hola');
    await EmailJSAdapter.send(config as any, formData);
    expect(window.emailjs.init).toHaveBeenCalledWith('pk');
    expect(fakeSend).toHaveBeenCalledWith('sid', 'tid', { msg: 'Hola' });
    delete window.emailjs;
  });
});

describe('Proxy Adapter', () => {
  it('debe hacer fetch al proxy con el payload correcto', async () => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ ok: true }),
      headers: { get: () => 'application/json' },
    });
    const adapter = createProxyAdapter('Test');
    const config = { type: 'webhook', proxyUrl: 'https://example.com/api', method: 'POST' };
    const formData = new FormData();
    formData.append('field1', 'value1');
    await adapter.send(config as any, formData);
    expect(fetch).toHaveBeenCalledWith('https://example.com/api', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ field1: 'value1' }),
    }));
    ((globalThis as any).fetch as jest.Mock).mockRestore();
  });
});
