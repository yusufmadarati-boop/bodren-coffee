/**
 * src/i18n.ts
 * ═══════════════════════════════════════════════════════════════
 * I18N MODULE — BODREN Coffee Shop
 *
 * Language state management, persistence, and translation lookup.
 * Zero DOM access. Zero event listeners.
 * ═══════════════════════════════════════════════════════════════
 */

import { LanguageCode } from './types.js';
import {
  DEFAULT_LANG,
  LANG_LABELS,
  RTL_LANGS,
  SUPPORTED_LANGS,
  TRANSLATIONS,
} from './translations.js';

export { DEFAULT_LANG, LANG_LABELS, RTL_LANGS, SUPPORTED_LANGS };

const LANG_STORAGE_KEY = 'bodren_lang_v1';

function isSupportedLang(code: string): code is LanguageCode {
  for (let i = 0; i < SUPPORTED_LANGS.length; i += 1) {
    if (SUPPORTED_LANGS[i] === code) {
      return true;
    }
  }
  return false;
}

function loadPersistedLang(): LanguageCode {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && isSupportedLang(stored)) {
      return stored;
    }
  } catch {
    // Non-fatal if localStorage is restricted
  }

  try {
    const rawLang = navigator.language || '';
    const parts = rawLang.split('-');
    const candidate = parts[0] ? parts[0].toLowerCase() : '';
    if (isSupportedLang(candidate)) {
      return candidate;
    }
  } catch {
    // Non-fatal if navigator is not defined
  }

  return DEFAULT_LANG;
}

let activeLang: LanguageCode = loadPersistedLang();

function persist(lang: LanguageCode): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Non-fatal
  }
}

export function getCurrentLang(): LanguageCode {
  return activeLang;
}

export function setCurrentLang(lang: LanguageCode): void {
  if (!isSupportedLang(lang)) {
    return;
  }
  activeLang = lang;
  persist(lang);
}

export function isRTL(lang: LanguageCode = activeLang): boolean {
  return RTL_LANGS.has(lang);
}

export function t(key: string, params?: Record<string, string | number>): string {
  const currentDict = TRANSLATIONS[activeLang];
  const fallbackDict = TRANSLATIONS[DEFAULT_LANG];

  let raw: string = key;
  if (currentDict && typeof currentDict[key] === 'string') {
    raw = currentDict[key];
  } else if (fallbackDict && typeof fallbackDict[key] === 'string') {
    raw = fallbackDict[key];
  }

  if (params) {
    const entries = Object.entries(params);
    for (let i = 0; i < entries.length; i += 1) {
      const entry = entries[i];
      if (entry) {
        const [token, val] = entry;
        raw = raw.replace(new RegExp(`\\{${token}\\}`, 'g'), String(val));
      }
    }
  }

  return raw;
}
