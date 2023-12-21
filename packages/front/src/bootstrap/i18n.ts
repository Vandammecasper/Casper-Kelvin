//TODO: add i18n
import { type I18nOptions, createI18n } from 'vue-i18n'

export const SUPPORTED_LOCALES: Record<string, string> = {
    en: 'English',
    fr: 'Français',
    nl: 'Nederlands',
    de: 'Deutsch',
    es: 'Español',
    ar: 'العربية',
}

export const DEFAULT_LOCALE = 'en'

export const i18nOptions: I18nOptions = {
    locale: DEFAULT_LOCALE,
    fallbackLocale: DEFAULT_LOCALE,
    legacy: false,
}

export const i18n = createI18n(i18nOptions)