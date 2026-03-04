import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      login: "Login",
      dashboard: "Dashboard",
      todo: "Todo List",
      logout: "Logout"
    }
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      login: "Connexion",
      dashboard: "Tableau de bord",
      todo: "Liste de tâches",
      logout: "Déconnexion"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
