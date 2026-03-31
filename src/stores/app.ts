import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { translations, type Lang } from '@/i18n/translations'

function isDayTime(): boolean {
  const hour = new Date().getHours()
  return hour >= 7 && hour < 21
}

function getTimeBasedTheme(): 'light' | 'dark' {
  return isDayTime() ? 'light' : 'dark'
}

export const useAppStore = defineStore('app', () => {
  // --- Theme ---
  const manualOverride = localStorage.getItem('theme-manual-override') === 'true'
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
  const initialTheme: 'light' | 'dark' = manualOverride
    ? savedTheme ?? 'dark'
    : getTimeBasedTheme()

  const theme = ref<'light' | 'dark'>(initialTheme)

  function applyTheme(t: 'light' | 'dark') {
    theme.value = t
    document.documentElement.setAttribute('data-theme', t)
  }

  function toggleTheme() {
    const next = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    localStorage.setItem('theme', next)
    localStorage.setItem('theme-manual-override', 'true')
  }

  // Apply immediately on init
  document.documentElement.setAttribute('data-theme', initialTheme)

  // Auto-update theme every minute unless manually overridden
  setInterval(() => {
    if (localStorage.getItem('theme-manual-override') !== 'true') {
      applyTheme(getTimeBasedTheme())
    }
  }, 60_000)

  // --- Language ---
  const savedLang = (localStorage.getItem('language') as Lang | null) ?? 'en'
  const lang = ref<Lang>(savedLang)

  function toggleLang() {
    lang.value = lang.value === 'en' ? 'nl' : 'en'
    localStorage.setItem('language', lang.value)
    document.documentElement.setAttribute('lang', lang.value)
  }

  function t(key: string): string {
    return translations[lang.value][key] ?? translations['en'][key] ?? key
  }

  const currentLang = computed(() => lang.value)

  // Apply lang attribute on init
  document.documentElement.setAttribute('lang', savedLang)

  // --- Modal ---
  const modalOpen = ref(false)

  function openModal() {
    modalOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    modalOpen.value = false
    document.body.style.overflow = ''
  }

  // --- Mobile Menu ---
  const mobileMenuOpen = ref(false)

  function openMobileMenu() {
    mobileMenuOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeMobileMenu() {
    mobileMenuOpen.value = false
    if (!modalOpen.value) {
      document.body.style.overflow = ''
    }
  }

  return {
    theme,
    toggleTheme,
    lang,
    currentLang,
    toggleLang,
    t,
    modalOpen,
    openModal,
    closeModal,
    mobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
  }
})
