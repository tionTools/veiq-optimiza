<template>
  <!-- Waitlist Modal -->
  <div class="waitlist-modal" id="waitlistModal">
      <div class="waitlist-modal-overlay" id="waitlistModalOverlay"></div>
      <div class="waitlist-modal-content">
          <button class="waitlist-modal-close" id="closeWaitlistModal" aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </button>
          
          <div class="waitlist-modal-header">
              <h2 data-i18n="waitlist.title">Request Demo</h2>
              <p data-i18n="waitlist.description">Get a personalized demo of VEIQ's AI-powered automotive intelligence.</p>
          </div>
    
          <form class="waitlist-form" id="waitlistForm" action="https://formspree.io/f/xdkjnrdq" method="POST">
              <div class="waitlist-field">
                  <input 
                      id="waitlist-company" 
                      name="company" 
                      type="text" 
                      data-i18n-placeholder="waitlist.companyPlaceholder"
                      placeholder="Your Company Name" 
                      required 
                      autocomplete="organization"
                  />
              </div>
    
              <div class="waitlist-field">
                  <input 
                      id="waitlist-email" 
                      name="email" 
                      type="email" 
                      data-i18n-placeholder="waitlist.emailPlaceholder"
                      placeholder="your.email@company.com" 
                      required 
                      autocomplete="email"
                  />
              </div>
    
              <div class="waitlist-field">
                  <input 
                      id="waitlist-phone" 
                      name="phone" 
                      type="tel" 
                      data-i18n-placeholder="waitlist.phonePlaceholder"
                      placeholder="+31 6 12 34 56 78" 
                      required 
                      autocomplete="tel"
                  />
              </div>
    
              <button type="submit" class="waitlist-submit-btn" id="waitlistSubmitBtn" data-i18n="waitlist.submit">
                  Request Demo
              </button>
    
              <p class="waitlist-form-note" id="waitlistFormNote" data-i18n="waitlist.note">
                  We'll never share your details. We'll be in touch soon to schedule your demo.
              </p>
          </form>
      </div>
  </div>
    
</template>
