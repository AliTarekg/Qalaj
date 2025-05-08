import './i18n';
import './themes.css';
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import i18n from "./i18n";
import { ThemeProvider } from "./ThemeContext";

// Set dir attribute on html element based on language
const setDir = (lng) => {
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
};
setDir(i18n.language);
i18n.on('languageChanged', setDir);

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
