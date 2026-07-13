import type { I18nStrings } from './types';

export const defaultI18n: Record<string, I18nStrings> = {
  es: {
    btnDefault: 'Enviar mensaje',
    btnWhatsapp: 'Enviar por WhatsApp',
    btnEmail: 'Enviar por Email',
    btnDiscord: 'Enviar por Discord',
    btnTelegram: 'Enviar por Telegram',
    btnSlack: 'Enviar por Slack',
    btnWebhook: 'Enviar',
    successDefault: '¡Mensaje enviado con éxito!',
    errorDefault: 'Error al enviar el mensaje. Inténtalo de nuevo.',
    errorTooFast: 'Espera unos segundos antes de enviar.',
    errorSpam: 'Error de validación. Si eres humano, recarga la página.',
    fieldRequired: 'Este campo es obligatorio.',
    fieldInvalidEmail: 'Introduce un email válido.',
    fieldInvalidTel: 'Introduce un teléfono válido.',
  },
  en: {
    btnDefault: 'Send message',
    btnWhatsapp: 'Send via WhatsApp',
    btnEmail: 'Send via Email',
    btnDiscord: 'Send via Discord',
    btnTelegram: 'Send via Telegram',
    btnSlack: 'Send via Slack',
    btnWebhook: 'Send',
    successDefault: 'Message sent successfully!',
    errorDefault: 'Error sending message. Please try again.',
    errorTooFast: 'Please wait a few seconds before sending.',
    errorSpam: 'Validation error. If you are human, please reload.',
    fieldRequired: 'This field is required.',
    fieldInvalidEmail: 'Enter a valid email address.',
    fieldInvalidTel: 'Enter a valid phone number.',
  },
  fr: {
    btnDefault: 'Envoyer un message',
    btnWhatsapp: 'Envoyer via WhatsApp',
    btnEmail: 'Envoyer par email',
    btnDiscord: 'Envoyer via Discord',
    btnTelegram: 'Envoyer via Telegram',
    btnSlack: 'Envoyer via Slack',
    btnWebhook: 'Envoyer',
    successDefault: 'Message envoyé avec succès !',
    errorDefault: 'Erreur lors de l\'envoi. Veuillez réessayer.',
    errorTooFast: 'Veuillez patienter quelques secondes avant d\'envoyer.',
    errorSpam: 'Erreur de validation. Si vous êtes humain, rechargez la page.',
    fieldRequired: 'Ce champ est obligatoire.',
    fieldInvalidEmail: 'Entrez une adresse email valide.',
    fieldInvalidTel: 'Entrez un numéro de téléphone valide.',
  },
  de: {
    btnDefault: 'Nachricht senden',
    btnWhatsapp: 'Per WhatsApp senden',
    btnEmail: 'Per E-Mail senden',
    btnDiscord: 'Per Discord senden',
    btnTelegram: 'Per Telegram senden',
    btnSlack: 'Per Slack senden',
    btnWebhook: 'Senden',
    successDefault: 'Nachricht erfolgreich gesendet!',
    errorDefault: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
    errorTooFast: 'Bitte warten Sie einige Sekunden, bevor Sie senden.',
    errorSpam: 'Validierungsfehler. Wenn Sie ein Mensch sind, laden Sie die Seite neu.',
    fieldRequired: 'Dieses Feld ist erforderlich.',
    fieldInvalidEmail: 'Geben Sie eine gültige E-Mail-Adresse ein.',
    fieldInvalidTel: 'Geben Sie eine gültige Telefonnummer ein.',
  },
};

export function resolveLanguage(userLang?: string): string {
  if (userLang && defaultI18n[userLang]) return userLang;
  if (typeof navigator !== 'undefined') {
    const navLang = navigator.language?.split('-')[0];
    if (navLang && defaultI18n[navLang]) return navLang;
  }
  return 'en';
}
