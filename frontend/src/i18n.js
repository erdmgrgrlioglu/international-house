import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import de from "./locales/de.json";

//https://www.i18next.com
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "de"],
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    fallbackLng: "en",
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: true },
  });

export default i18n;
