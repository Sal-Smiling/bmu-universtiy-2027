import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en/translation.json';
import translationKH from './locales/kh/translation.json';
import translationCH from './locales/ch/translation.json';

const resources = {
  En: {
    translation: translationEN
  },
  Kh: {
    translation: translationKH
  },
  Ch: {
    translation: translationCH
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('bmu_lang') || 'En',
    fallbackLng: 'En',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
