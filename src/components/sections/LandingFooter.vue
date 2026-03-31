<script setup lang="ts">
function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <!-- Footer -->
  <footer class="footer">
      <div class="footer-main">
          <div class="footer-main-container">
              <div class="footer-column-brand">
                  <h3 class="footer-brand-title" data-i18n="footer.tagline">Bringing agentic AI</h3>
                  <p class="footer-brand-subtitle" data-i18n="footer.taglineSub">to automotive trading</p>
                  <a href="#" class="footer-logo" @click.prevent="scrollToTop">
                      <img src="/assets/logos/logo_2026.png" alt="VEIQ" class="footer-logo-img">
                  </a>
              </div>
              
              <div class="footer-column-links">
                  <h4 class="footer-column-title" data-i18n="footer.productCompany">Product / Company</h4>
                  <ul class="footer-link-list">
                      <li><a href="#heroAnimationSection" class="footer-link" data-i18n="nav.features">Features</a></li>
                      <li><a href="#hero" class="footer-link" data-i18n="nav.story">Story</a></li>
                      <li><a href="#founders" class="footer-link" data-i18n="nav.about">About</a></li>
                      <li><a href="#founders" class="footer-link" data-i18n="team.title">Team</a></li>
                      <li><a href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/" target="_blank" rel="noopener noreferrer" class="footer-link">Contact</a></li>
                  </ul>
              </div>
              
              <div class="footer-column-social">
                  <h4 class="footer-column-title" data-i18n="footer.followUs">Follow Us</h4>
                  <ul class="footer-social-list">
                      <li>
                          <a href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/" target="_blank" rel="noopener noreferrer" class="footer-social-link">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="footer-social-icon">
                                  <path d="M2.33333 2.33333L11.6667 11.6667M11.6667 2.33333L2.33333 11.6667" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                              </svg>
                              <span>X.com</span>
                          </a>
                      </li>
                      <li>
                          <a href="https://www.linkedin.com/in/arvin-esterabadi-b283a1166/" target="_blank" rel="noopener noreferrer" class="footer-social-link">
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
              <span class="footer-copyright" data-i18n="footer.copyright">© 2026 VEIQ. All rights reserved.</span>
              <div class="footer-legal-links">
                  <a href="#privacy" class="footer-legal-link" data-i18n="footer.privacy">Privacy Policy</a>
                  <a href="#terms" class="footer-legal-link" data-i18n="footer.terms">Terms of Services</a>
                  <a href="#imprint" class="footer-legal-link" data-i18n="footer.imprint">Imprint</a>
              </div>
          </div>
      </div>
  </footer>
</template>
