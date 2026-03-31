<script setup lang="ts">
import AiBreathingIcon from '../common/AiBreathingIcon.vue'
</script>

<template>
  <!-- Hero Section -->
  <section class="hero" id="hero">
      <!-- Animated Background Gradient Blobs -->
      <div class="animated-bg-gradients">
          <div class="bg-gradient-blob bg-gradient-blob-1"></div>
          <div class="bg-gradient-blob bg-gradient-blob-2"></div>
          <div class="bg-gradient-blob bg-gradient-blob-3"></div>
      </div>
      <div class="hero-market-ticker">
          <div class="market-ticker-track">
              <div class="market-ticker-item active">
                  <i data-lucide="zap" class="ticker-icon-lucide"></i>
                  <span class="ticker-value" data-value="612">612</span>
                  <span class="ticker-label">deals analyzed today</span>
              </div>
              <div class="market-ticker-item">
                  <i data-lucide="bar-chart-3" class="ticker-icon-lucide"></i>
                  <span class="ticker-value" data-value="128463">128,463</span>
                  <span class="ticker-label">listings analyzed</span>
              </div>
              <div class="market-ticker-item">
                  <i data-lucide="euro" class="ticker-icon-lucide"></i>
                  <span class="ticker-value" data-value="34.7" data-prefix="€" data-suffix="M">€34.7M</span>
                  <span class="ticker-label">in opportunities</span>
              </div>
              <div class="market-ticker-item">
                  <i data-lucide="zap" class="ticker-icon-lucide"></i>
                  <span class="ticker-value" data-value="24">24</span>
                  <span class="ticker-label">new deals today</span>
              </div>
              <div class="market-ticker-item">
                  <i data-lucide="target" class="ticker-icon-lucide"></i>
                  <span class="ticker-value" data-value="88" data-suffix="%">88%</span>
                  <span class="ticker-label">match accuracy</span>
              </div>
          </div>
      </div>
      <div class="hero-stats-badge">
          <div class="stats-badge-track">
              <div class="stats-badge-item active">
                  <i data-lucide="clock" class="stats-badge-icon-lucide"></i>
                  <span class="stats-badge-value" data-value="7.5" data-suffix="hrs">7.5hrs</span>
                  <span class="stats-badge-label">saved daily</span>
              </div>
              <div class="stats-badge-item">
                  <i data-lucide="trending-up" class="stats-badge-icon-lucide"></i>
                  <span class="stats-badge-value" data-value="23" data-suffix="%">+23%</span>
                  <span class="stats-badge-label">extra profit</span>
              </div>
              <div class="stats-badge-item">
                  <i data-lucide="repeat" class="stats-badge-icon-lucide"></i>
                  <span class="stats-badge-value" data-value="40" data-suffix="%">+40%</span>
                  <span class="stats-badge-label">more turnover</span>
              </div>
          </div>
      </div>
      <div class="hero-container">
          <div class="hero-content">
          <AiBreathingIcon tag="a" href="#aiPromptSection" root-class="ai-breathing-icon hero-ai-icon" id="heroAiIcon" />
    
              <div class="hero-eyebrow">
                  Agentic AI for Automotive Trading
              </div>
              <h1 class="hero-headline" data-i18n="hero.headline">Buy Better Cars. Make More, In Less Time.</h1>
              <div class="hero-ctas">
                  <button class="btn-hero-primary" id="openWaitlistModalHero" data-i18n="hero.seeDeals">Request Demo</button>
                  <a href="#heroAnimationSection" class="hero-stats-preview">
                      <div class="stats-preview-icon-wrapper">
                          <div class="stats-preview-icon active" data-stat="time">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                              </svg>
                          </div>
                          <div class="stats-preview-icon" data-stat="profit">
                              <i data-lucide="trending-up" class="stats-icon-lucide"></i>
                          </div>
                          <div class="stats-preview-icon" data-stat="turnover">
                              <i data-lucide="repeat" class="stats-icon-lucide"></i>
                          </div>
                      </div>
                      <div class="stats-preview-carousel">
                          <span class="stats-preview-value active" data-stat="time">8hrs → 30min</span>
                          <span class="stats-preview-value" data-stat="profit">+23% profit</span>
                          <span class="stats-preview-value" data-stat="turnover">+40% turnover</span>
                      </div>
                  </a>
              </div>
          </div>
          <div class="hero-image-wrapper">
              <img src="/assets/heros/mock_hero.webp" alt="VEIQ Platform" class="hero-main-image hero-main-image-desktop">
              <img src="/assets/heros/mock_hero_mobile.webp" alt="VEIQ Platform" class="hero-main-image hero-main-image-mobile">
          </div>
          <div class="hero-before-after">
              <h2 class="hero-before-after-title" data-i18n="beforeAfter.title">From problem to solution</h2>
              <div class="before-after-comparison">
                  <div class="before-after-item">
                      <div class="before-after-label-number">1</div>
                      <div class="before-after-image-wrapper">
                          <img src="/assets/heros/before.webp" alt="Manual & Chaotic - Multiple car listings scattered, no clear ranking" class="before-after-image">
                          <div class="before-after-tooltip">
                              <div class="before-after-tooltip-mini">
                                  <p data-i18n="beforeAfter.tooltip1Mini">Manual searching, guessing, wasting time.</p>
                              </div>
                              <div class="before-after-tooltip-full">
                                  <p data-i18n="beforeAfter.tooltip1Full">Manual searching, guessing, wasting time, missing good deals. Dealers struggle with scattered listings across multiple marketplaces, no clear ranking, and decision overload.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div class="before-after-divider">
                      <i data-lucide="arrow-right" class="before-after-arrow"></i>
                  </div>
                  
                  <div class="before-after-item">
                      <div class="before-after-label-number">2</div>
                      <div class="before-after-image-wrapper">
                          <img src="/assets/heros/after.webp" alt="Clear & Ranked - One ranked list of vehicle opportunities, best deals highlighted" class="before-after-image">
                          <div class="before-after-tooltip">
                              <div class="before-after-tooltip-mini">
                                  <p data-i18n="beforeAfter.tooltip2Mini">AI ranks the best deals automatically.</p>
                              </div>
                              <div class="before-after-tooltip-full">
                                  <p data-i18n="beforeAfter.tooltip2Full">AI ranks the best deals automatically. Action-ready clarity with one ranked list of vehicle opportunities, each deal clearly scored by margin, rotation speed, and fit.</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  
                  <div class="before-after-plus">
                      <i data-lucide="plus" class="before-after-plus-icon"></i>
                  </div>
                  
                  <div class="before-after-item">
                      <div class="before-after-label-number">3</div>
                      <div class="before-after-image-wrapper">
                          <img src="/assets/heros/after2.webp" alt="VEIQ Platform" class="before-after-image">
                          <div class="before-after-tooltip">
                              <div class="before-after-tooltip-mini">
                                  <p data-i18n="beforeAfter.tooltip3Mini">VEIQ's intelligent platform transforms automotive trading.</p>
                              </div>
                              <div class="before-after-tooltip-full">
                                  <p data-i18n="beforeAfter.tooltip3Full">VEIQ's intelligent platform delivers real-time market intelligence and automated execution, transforming how dealers source and acquire vehicles.</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>
