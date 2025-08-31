import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esJSON from "./locales/es/translation.json";
import enJSON from "./locales/en/translation.json";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enJSON,
      },
      es: {
        translation: esJSON,
      },
    },

    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });
