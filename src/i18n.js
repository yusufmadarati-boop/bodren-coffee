/**
 * src/i18n.js
 * ═══════════════════════════════════════════════════════════════
 * I18N LOGIC MODULE — BODREN Coffee Shop
 *
 * RESPONSIBILITY: Language state management and translation lookup.
 *
 * ⛔ STRICT RULES:
 *   - Zero DOM access in this file (no document, no window.*).
 *   - Zero event listeners.
 *   - Only reads/writes to localStorage for persistence.
 *   - All exports are pure functions or simple state accessors.
 *
 * Import chain (no circular deps):
 *   translations.js → i18n.js → (ui.js | quiz.js | main.js)
 * ═══════════════════════════════════════════════════════════════
 */

import {
  TRANSLATIONS,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  RTL_LANGS,
  LANG_LABELS,
} from './translations.js';

// Re-export constants so callers only need to import from one place
export { SUPPORTED_LANGS, DEFAULT_LANG, LANG_LABELS, RTL_LANGS };

/** localStorage key for language preference persistence. */
const LANG_STORAGE_KEY = 'bodren_lang_v1';

// ─── Private State ──────────────────────────────────────────────

/** Currently active language code. */
let _currentLang = _loadPersistedLang();

// ─── Persistence Helpers ────────────────────────────────────────

/**
 * Reads the user's saved language from localStorage.
 * Falls back to browser language detection, then DEFAULT_LANG.
 * @returns {string} A valid language code.
 */
function _loadPersistedLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {
    /* localStorage unavailable (e.g. private mode) — ignore */
  }

  // Browser language detection (e.g. "ar-SA" → "ar")
  try {
    const browserLang = (navigator.language || '').split('-')[0].toLowerCase();
    if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;
  } catch {
    /* navigator unavailable — ignore */
  }

  return DEFAULT_LANG;
}

/**
 * Writes the active language to localStorage so it survives page refresh.
 * @param {string} lang
 */
function _persist(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* Storage write failure — non-fatal */
  }
}

// ─── Public API ─────────────────────────────────────────────────

/**
 * Returns the currently active language code.
 * @returns {string}
 */
export function getCurrentLang() {
  return _currentLang;
}

/**
 * Sets the active language and persists it.
 * Silently ignores unsupported language codes.
 * @param {string} lang
 */
export function setCurrentLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  _currentLang = lang;
  _persist(lang);
}

/**
 * Returns true when the given language (or current language) is RTL.
 * @param {string} [lang]
 * @returns {boolean}
 */
export function isRTL(lang = _currentLang) {
  return RTL_LANGS.has(lang);
}

/**
 * Returns the translated string for a key in the current language.
 *
 * Fallback chain: currentLang → DEFAULT_LANG ('en') → key itself.
 *
 * Supports {token} interpolation:
 *   t('quiz.progress', { current: 2, total: 3 }) → "Question 2 of 3"
 *
 * @param {string} key
 * @param {Record<string, string|number>} [params]
 * @returns {string}
 */
export function t(key, params = {}) {
  const dict = TRANSLATIONS[_currentLang] ?? {};
  const fallback = TRANSLATIONS[DEFAULT_LANG] ?? {};

  let value = dict[key] ?? fallback[key] ?? key;

  // Simple {token} interpolation
  if (params && Object.keys(params).length > 0) {
    value = value.replace(/\{(\w+)\}/g, (_, token) =>
      params[token] !== undefined ? String(params[token]) : `{${token}}`
    );
  }

  return value;
}
