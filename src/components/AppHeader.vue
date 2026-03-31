<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/composables/useI18n'

const emit = defineEmits<{ 'open-modal': [] }>()

const { theme, toggleTheme } = useTheme()
const { t, currentLanguage, toggleLanguage } = useI18n()

const isMenuOpen = ref(false)
const isScrolled = ref(false)
const headerRef = ref<HTMLElement | null>(null)

const logoSrc = computed(() =>
  theme.value === 'dark'
    ? '/assets/logos/logo_2026.png'
    : '/assets/logos/logo_2026_black.png'
)

function scrollToSection(hash: string) {
  const el = document.querySelector(hash)
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
  isMenuOpen.value = false
}

function openModal() {
  emit('open-modal')
  isMenuOpen.value = false
}

let lastScrollY = 0

function onScroll() {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 20
  lastScrollY = scrollY
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header ref="headerRef" class="header" :class="{ scrolled: isScrolled }">
    <div class="header-container">
      <a href="#" class="logo" @click.prevent="scrollToSection('#hero')">
        <img :src="logoSrc" alt="VEIQ logo" class="logo-img" style="height:44px; width:auto; vertical-align:middle;">
      </a>

      <nav class="nav">
        <a href="#hero" class="nav-link" @click.prevent="scrollToSection('#hero')">{{ t('nav.home') }}</a>
        <a href="#heroAnimationSection" class="nav-link" @click.prevent="scrollToSection('#heroAnimationSection')">{{ t('nav.features') }}</a>
        <a href="#aiPromptSection" class="nav-link" @click.prevent="scrollToSection('#aiPromptSection')">{{ t('nav.testimonials') }}</a>
        <a href="#founders" class="nav-link" @click.prevent="scrollToSection('#founders')">{{ t('nav.about') }}</a>
        <a href="https://app.veiq.ai" class="nav-link" target="_blank" rel="noopener noreferrer">{{ t('nav.login') }}</a>
      </nav>

      <div class="header-buttons">
        <button class="btn-primary" @click="openModal">{{ t('nav.joinWaitlist') }}</button>
        <button
          class="language-toggle"
          :data-lang="currentLanguage"
          aria-label="Toggle language"
          title="Switch to Dutch / Wissel naar Nederlands"
          @click="toggleLanguage"
        >
          <span class="language-code en-code">EN</span>
          <span class="language-code nl-code">NL</span>
        </button>
        <button class="dark-mode-toggle" aria-label="Toggle dark mode" @click="toggleTheme">
          <svg class="dark-mode-icon sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="dark-mode-icon moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>

      <div class="mobile-header-controls">
        <button
          class="language-toggle mobile-language-toggle-header"
          :data-lang="currentLanguage"
          aria-label="Toggle language"
          @click="toggleLanguage"
        >
          <span class="language-code en-code">EN</span>
          <span class="language-code nl-code">NL</span>
        </button>
        <button class="mobile-menu-toggle" aria-label="Toggle menu" @click="isMenuOpen = !isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <div v-if="isMenuOpen" class="mobile-menu active">
      <div class="mobile-menu-header">
        <img :src="logoSrc" alt="VEIQ" class="logo-img" style="height:36px; width:auto;">
        <button class="mobile-menu-close" aria-label="Close menu" @click="isMenuOpen = false">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6L18 18"></path>
          </svg>
        </button>
      </div>
      <nav class="mobile-menu-nav">
        <a href="#hero" class="mobile-menu-link" @click.prevent="scrollToSection('#hero')">{{ t('nav.home') }}</a>
        <a href="#heroAnimationSection" class="mobile-menu-link" @click.prevent="scrollToSection('#heroAnimationSection')">{{ t('nav.features') }}</a>
        <a href="#aiPromptSection" class="mobile-menu-link" @click.prevent="scrollToSection('#aiPromptSection')">{{ t('nav.testimonials') }}</a>
        <a href="#founders" class="mobile-menu-link" @click.prevent="scrollToSection('#founders')">{{ t('nav.about') }}</a>
        <a href="https://app.veiq.ai" class="mobile-menu-link" target="_blank" rel="noopener noreferrer">{{ t('nav.login') }}</a>
      </nav>
      <div class="mobile-menu-actions">
        <button class="btn-primary" @click="openModal">{{ t('nav.joinWaitlist') }}</button>
        <button class="dark-mode-toggle" aria-label="Toggle dark mode" @click="toggleTheme">
          <svg class="dark-mode-icon sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg class="dark-mode-icon moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
      </div>
    </div>
  </Teleport>
</template>
