// Simple client-side i18n for Home page (EN / VI)

const SUPPORTED_LANGS = ["en", "vi"];
const I18N_STORAGE_KEY = "stepdevcode_lang";

function getInitialLang() {
  const stored = localStorage.getItem(I18N_STORAGE_KEY);
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const browser = navigator.language || navigator.userLanguage || "en";
  return browser.toLowerCase().startsWith("vi") ? "vi" : "en";
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  document.documentElement.setAttribute("data-lang", lang);
}

async function loadTranslations(lang) {
  try {
    const res = await fetch(`assets/data/i18n-${lang}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn("Failed to load i18n file", e);
    return null;
  }
}

function resolvePath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc && acc[key] != null ? acc[key] : null), obj);
}

async function applyTranslations(lang) {
  const data = await loadTranslations(lang);
  if (!data) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const value = resolvePath(data, key);
    if (typeof value === "string") {
      el.textContent = value;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const currentLang = getInitialLang();
  setLang(currentLang);
  applyTranslations(currentLang);

  // Language switch buttons
  const switchers = document.querySelectorAll("[data-lang-switch]");
  switchers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang-switch");
      if (!lang) return;
      setLang(lang);
      applyTranslations(lang);
    });
  });
});


