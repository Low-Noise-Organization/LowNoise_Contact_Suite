import { LowNoiseContactSuite } from '../../src/core/LowNoiseContactSuite';

describe('Validación', () => {
  let instance: LowNoiseContactSuite;

  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    instance = new LowNoiseContactSuite({
      container: '#root',
      channels: [{ type: 'whatsapp', number: '123' }],
      i18n: { lang: 'es' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'custom', type: 'text', validation: /^\d+$/, errorMessage: 'Solo números' },
      ],
    });
  });

  afterEach(() => {
    instance.destroy();
  });

  it('debe mostrar error si campo requerido está vacío', async () => {
    const input = document.getElementById('lcs-name') as HTMLInputElement;
    input.value = '';
    const valid = await (instance as any).validateAll();
    expect(valid).toBe(false);
    expect(document.querySelector('#lcs-error-name')?.textContent).toContain('obligatorio');
  });

  it('debe validar email', async () => {
    const input = document.getElementById('lcs-email') as HTMLInputElement;
    input.value = 'no-email';
    await (instance as any).validateAll();
    expect(document.querySelector('#lcs-error-email')?.textContent).toContain('válido');
  });

  it('debe aceptar validación personalizada con regex', async () => {
    const input = document.getElementById('lcs-custom') as HTMLInputElement;
    input.value = 'abc';
    await (instance as any).validateAll();
    expect(document.querySelector('#lcs-error-custom')?.textContent).toBe('Solo números');
  });
});
