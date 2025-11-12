import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  'pt-BR': {
    translation: {
      welcome: 'Sua nova rota profissional',
      start: 'Começar',
    },
  },
  en: {
    translation: {
      welcome: 'Your new professional route',
      start: 'Start',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales?.()[0]?.languageTag || 'pt-BR',
  fallbackLng: 'pt-BR',
  interpolation: { escapeValue: false },
});

export default i18n;
