<script setup lang="ts">
import { useAppStore } from '@/stores/app'

const store = useAppStore()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToAnchor(id: string) {
  const el = document.querySelector(id)
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer class="footer">
    <div class="footer-main">
      <div class="footer-main-container">
        <div class="footer-column-brand">
          <h3 class="footer-brand-title">{{ store.t('footer.tagline') }}</h3>
          <p class="footer-brand-subtitle">{{ store.t('footer.taglineSub') }}</p>
          <a href="#" class="footer-logo" @click.prevent="scrollToTop()">
            <img src="/assets/logos/logo_2026.png" alt="VEIQ" class="footer-logo-img" />
          </a>
        </div>

        <div class="footer-column-links">
          <h4 class="footer-column-title">{{ store.t('footer.productCompany') }}</h4>
          <ul class="footer-link-list">
            <li>
              <a href="#heroAnimationSection" class="footer-link" @click.prevent="scrollToAnchor('#heroAnimationSection')">
                {{ store.t('nav.features') }}
              </a>
            </li>
            <li>
              <a href="#hero" class="footer-link" @click.prevent="scrollToAnchor('#hero')">
                {{ store.t('nav.story') }}
              </a>
            </li>
            <li>
              <a href="#founders" class="footer-link" @click.prevent="scrollToAnchor('#founders')">
                {{ store.t('nav.about') }}
              </a>
            </li>
            <li>
              <a href="#founders" class="footer-link" @click.prevent="scrollToAnchor('#founders')">
                {{ store.t('team.title') }}
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
              >Contact</a>
            </li>
          </ul>
        </div>

        <div class="footer-column-social">
          <h4 class="footer-column-title">{{ store.t('footer.followUs') }}</h4>
          <ul class="footer-social-list">
            <li>
              <a
                href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-link"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="footer-social-icon">
                  <path d="M2.33333 2.33333L11.6667 11.6667M11.6667 2.33333L2.33333 11.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>X.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-link"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="footer-social-icon">
                  <rect x="2" y="2" width="10" height="10" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"/>
                  <circle cx="5" cy="5" r="0.8" fill="currentColor"/>
                  <path d="M4 9.33333V6M7 9.33333V7.33333C7 6.78105 7.44772 6.33333 8 6.33333C8.55228 6.33333 9 6.78105 9 7.33333V9.33333" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-container">
        <span class="footer-copyright">{{ store.t('footer.copyright') }}</span>
        <div class="footer-legal-links">
          <a href="#privacy" class="footer-legal-link">{{ store.t('footer.privacy') }}</a>
          <a href="#terms" class="footer-legal-link">{{ store.t('footer.terms') }}</a>
          <a href="#imprint" class="footer-legal-link">{{ store.t('footer.imprint') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
