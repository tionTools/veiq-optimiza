<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()

function scrollToAnchor(id: string) {
  store.closeMobileMenu()
  setTimeout(() => {
    const el = document.querySelector(id)
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }, 50)
}
</script>

<template>
  <Transition name="mobile-menu-fade">
    <div v-if="store.mobileMenuOpen" class="mobile-menu active" @click.self="store.closeMobileMenu()">
      <div class="mobile-menu-header">
        <div class="mobile-menu-header-controls">
          <button class="dark-mode-toggle mobile-dark-mode-toggle" aria-label="Toggle dark mode" @click="store.toggleTheme()">
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
            <svg class="dark-mode-icon moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>
        <button class="mobile-menu-close" aria-label="Close menu" @click="store.closeMobileMenu()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <nav class="mobile-nav">
        <a href="#hero" class="mobile-nav-link" @click.prevent="scrollToAnchor('#hero')">
          {{ store.t('nav.home') }}
        </a>
        <a href="#heroAnimationSection" class="mobile-nav-link" @click.prevent="scrollToAnchor('#heroAnimationSection')">
          {{ store.t('nav.features') }}
        </a>
        <a href="#aiPromptSection" class="mobile-nav-link" @click.prevent="scrollToAnchor('#aiPromptSection')">
          AI
        </a>
        <a href="#founders" class="mobile-nav-link" @click.prevent="scrollToAnchor('#founders')">
          {{ store.t('team.title') }}
        </a>
        <a href="https://app.veiq.ai" class="mobile-nav-link" target="_blank" rel="noopener noreferrer">
          {{ store.t('nav.login') }}
        </a>

        <div class="mobile-nav-buttons">
          <a
            href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary mobile-btn"
          >Contact</a>
          <button class="btn-primary mobile-btn" @click="store.closeMobileMenu(); store.openModal()">
            {{ store.t('nav.joinWaitlist') }}
          </button>
        </div>
      </nav>
    </div>
  </Transition>
</template>
