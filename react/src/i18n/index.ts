import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          locale: 'en-US',
          language: { label: 'LT', key: 'lt' },
          // language: { label: 'Lietuviski', key: 'lt' },
          today: 'today',
          tlgTheme: 'Toggle theme',
        },
      },
      lt: {
        translation: {
          locale: 'lt-LT',
          language: { label: 'EN', key: 'en' },
          // language: { label: 'English', key: 'en' },
          today: 'šiandien',
          tlgTheme: 'Pakeisti temą',
        },
      },
    },
  });

export default i18n;
