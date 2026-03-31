<script setup lang="ts">
interface NavLink {
  href: string
  i18n: string
  label: string
  external?: boolean
}

const navLinks: NavLink[] = [
  { href: '#hero', i18n: 'nav.home', label: 'Home' },
  { href: '#heroAnimationSection', i18n: 'nav.features', label: 'Features' },
  { href: '#aiPromptSection', i18n: 'nav.testimonials', label: 'AI' },
  { href: '#founders', i18n: 'nav.about', label: 'Team' },
  { href: 'https://app.veiq.ai', i18n: 'nav.login', label: 'Login', external: true },
]
</script>

<template>
  <div class="dashboard-overlay"></div>

  <header class="header">
    <div class="header-container">
      <a href="index.html" class="logo">
        <img src="/assets/logos/logo_2026.png" alt="VEIQ logo" class="logo-img" style="height:44px; width:auto; vertical-align:middle;">
      </a>

      <nav class="nav">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="nav-link"
          :data-i18n="link.i18n"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="header-buttons">
        <button class="btn-primary" id="openWaitlistModal" data-i18n="nav.joinWaitlist">Request Demo</button>
        <button class="language-toggle" id="languageToggle" aria-label="Toggle language" title="Switch to Dutch / Wissel naar Nederlands" data-lang="en">
          <span class="language-code en-code">EN</span>
          <span class="language-code nl-code">NL</span>
        </button>
        <button class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode">
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
        <button class="language-toggle mobile-language-toggle-header" id="mobileLanguageToggleHeader" aria-label="Toggle language" title="Switch to Dutch / Wissel naar Nederlands" data-lang="en">
          <span class="language-code en-code">EN</span>
          <span class="language-code nl-code">NL</span>
        </button>
        <button class="mobile-menu-toggle" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>
