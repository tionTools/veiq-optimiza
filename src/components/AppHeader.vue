<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const isScrolled = ref(false)
const isHidden = ref(false)
const aiIconProgress = ref(0)
let lastScrollY = 0

const AI_TRANSITION_START = 50
const AI_TRANSITION_END = 130
const AI_TRANSITION_RANGE = AI_TRANSITION_END - AI_TRANSITION_START

function handleScroll() {
  const y = window.scrollY
  isScrolled.value = y > 10

  // AI icon transition progress
  const progress = Math.max(0, Math.min(1, (y - AI_TRANSITION_START) / AI_TRANSITION_RANGE))
  aiIconProgress.value = progress

  // Mobile: hide header on scroll down, show on scroll up
  if (window.innerWidth <= 768) {
    if (y <= 5) {
      isHidden.value = false
    } else {
      const delta = Math.abs(y - lastScrollY)
      if (delta >= 10) {
        isHidden.value = y > lastScrollY && y > 50
      }
    }
  } else {
    isHidden.value = false
  }

  lastScrollY = y <= 0 ? 0 : y
}

onMounted(() => {
  lastScrollY = window.scrollY
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function scrollToAnchor(id: string) {
  const el = document.querySelector(id)
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
  store.closeMobileMenu()
}
</script>

<template>
  <header
    class="header"
    :class="{ scrolled: isScrolled, 'header-hidden': isHidden }"
  >
    <div class="header-container">
      <!-- Logo -->
      <a href="#" class="logo" @click.prevent="scrollToAnchor('#hero')">
        <img
          :src="store.theme === 'dark' ? '/assets/logos/logo_2026.png' : '/assets/logos/logo_2026_black.png'"
          alt="VEIQ logo"
          class="logo-img"
          style="height:44px; width:auto; vertical-align:middle;"
        />
      </a>

      <!-- Desktop Nav -->
      <nav class="nav">
        <a href="#hero" class="nav-link" @click.prevent="scrollToAnchor('#hero')">
          {{ store.t('nav.home') }}
        </a>
        <a href="#heroAnimationSection" class="nav-link" @click.prevent="scrollToAnchor('#heroAnimationSection')">
          {{ store.t('nav.features') }}
        </a>
        <a href="#aiPromptSection" class="nav-link" @click.prevent="scrollToAnchor('#aiPromptSection')">
          AI
        </a>
        <a href="#founders" class="nav-link" @click.prevent="scrollToAnchor('#founders')">
          {{ store.t('team.title') }}
        </a>
        <a href="https://app.veiq.ai" class="nav-link" target="_blank" rel="noopener noreferrer">
          {{ store.t('nav.login') }}
        </a>
      </nav>

      <!-- Desktop Header Buttons -->
      <div class="header-buttons">
        <button class="btn-primary" @click="store.openModal()">
          {{ store.t('nav.joinWaitlist') }}
        </button>

        <!-- Language Toggle -->
        <button
          class="language-toggle"
          :data-lang="store.lang"
          aria-label="Toggle language"
          @click="store.toggleLang()"
        >
          <span class="language-code en-code">EN</span>
          <span class="language-code nl-code">NL</span>
        </button>

        <!-- Dark Mode Toggle -->
        <button class="dark-mode-toggle" aria-label="Toggle dark mode" @click="store.toggleTheme()">
          <!-- Sun icon -->
          <svg class="dark-mode-icon sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <!-- Moon icon -->
          <svg class="dark-mode-icon moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Header Controls -->
      <div class="mobile-header-controls">
        <button
          class="language-toggle mobile-language-toggle-header"
          :data-lang="store.lang"
          aria-label="Toggle language"
          @click="store.toggleLang()"
        >
          <span class="language-code en-code">EN</span>
          <span class="language-code nl-code">NL</span>
        </button>

        <button
          class="mobile-menu-toggle"
          :class="{ active: store.mobileMenuOpen }"
          aria-label="Toggle menu"
          @click="store.openMobileMenu()"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>
