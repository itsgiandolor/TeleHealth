import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';
import tl from './locales/tl/common.json';

const resources = {
    en: {
        translation: en,
    },
    tl: {
        translation: tl,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
