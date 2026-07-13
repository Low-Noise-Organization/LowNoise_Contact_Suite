import { resolveLanguage, defaultI18n } from '../../src/core/i18n';

describe('i18n', () => {
  it('devuelve es si el idioma del navegador es español', () => {
    jest.spyOn(navigator, 'language', 'get').mockReturnValue('es-ES');
    expect(resolveLanguage()).toBe('es');
  });

  it('devuelve en por defecto', () => {
    jest.spyOn(navigator, 'language', 'get').mockReturnValue('xx');
    expect(resolveLanguage()).toBe('en');
  });

  it('acepta sobrescrituras', () => {
    const lang = resolveLanguage('fr');
    expect(lang).toBe('fr');
    expect(defaultI18n.fr.btnDefault).toContain('Envoyer');
  });
});
