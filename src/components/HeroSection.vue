<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

// --- Market Ticker carousel ---
const tickerItems = [
  { icon: 'zap', value: '612', label: 'deals analyzed today' },
  { icon: 'bar-chart-3', value: '128,463', label: 'listings analyzed' },
  { icon: 'euro', value: '€34.7M', label: 'in opportunities' },
  { icon: 'zap', value: '24', label: 'new deals today' },
  { icon: 'target', value: '88%', label: 'match accuracy' },
]
const activeTicker = ref(0)

// --- Stats badge carousel ---
const statsBadges = [
  { icon: 'clock', value: '7.5hrs', label: 'saved daily' },
  { icon: 'trending-up', value: '+23%', label: 'extra profit' },
  { icon: 'repeat', value: '+40%', label: 'more turnover' },
]
const activeBadge = ref(0)

// --- Stats preview carousel ---
const statsPreview = [
  { key: 'time', value: '8hrs → 30min' },
  { key: 'profit', value: '+23% profit' },
  { key: 'turnover', value: '+40% turnover' },
]
const activePreview = ref(0)

let tickerTimer: ReturnType<typeof setInterval>
let badgeTimer: ReturnType<typeof setInterval>
let previewTimer: ReturnType<typeof setInterval>

onMounted(() => {
  tickerTimer = setInterval(() => {
    activeTicker.value = (activeTicker.value + 1) % tickerItems.length
  }, 3000)
  badgeTimer = setInterval(() => {
    activeBadge.value = (activeBadge.value + 1) % statsBadges.length
  }, 3200)
  previewTimer = setInterval(() => {
    activePreview.value = (activePreview.value + 1) % statsPreview.length
  }, 2800)
})

onUnmounted(() => {
  clearInterval(tickerTimer)
  clearInterval(badgeTimer)
  clearInterval(previewTimer)
})

function scrollToFeatures() {
  const el = document.querySelector('#heroAnimationSection')
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
}

function scrollToAI() {
  const el = document.querySelector('#aiPromptSection')
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }
}
</script>

<template>
  <section class="hero" id="hero">
    <!-- Animated Background Gradient Blobs -->
    <div class="animated-bg-gradients">
      <div class="bg-gradient-blob bg-gradient-blob-1"></div>
      <div class="bg-gradient-blob bg-gradient-blob-2"></div>
      <div class="bg-gradient-blob bg-gradient-blob-3"></div>
    </div>

    <!-- Market Ticker -->
    <div class="hero-market-ticker">
      <div class="market-ticker-track">
        <div
          v-for="(item, i) in tickerItems"
          :key="i"
          class="market-ticker-item"
          :class="{ active: activeTicker === i }"
        >
          <svg class="ticker-icon-lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <!-- zap -->
            <template v-if="item.icon === 'zap'">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </template>
            <!-- bar-chart-3 -->
            <template v-else-if="item.icon === 'bar-chart-3'">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </template>
            <!-- euro -->
            <template v-else-if="item.icon === 'euro'">
              <path d="M4 10h12M4 14h12M19.5 7A8 8 0 1 0 19.5 17"/>
            </template>
            <!-- target -->
            <template v-else-if="item.icon === 'target'">
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
            </template>
          </svg>
          <span class="ticker-value">{{ item.value }}</span>
          <span class="ticker-label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Stats Badge -->
    <div class="hero-stats-badge">
      <div class="stats-badge-track">
        <div
          v-for="(badge, i) in statsBadges"
          :key="i"
          class="stats-badge-item"
          :class="{ active: activeBadge === i }"
        >
          <svg class="stats-badge-icon-lucide" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <template v-if="badge.icon === 'clock'">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </template>
            <template v-else-if="badge.icon === 'trending-up'">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </template>
            <template v-else-if="badge.icon === 'repeat'">
              <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </template>
          </svg>
          <span class="stats-badge-value">{{ badge.value }}</span>
          <span class="stats-badge-label">{{ badge.label }}</span>
        </div>
      </div>
    </div>

    <div class="hero-container">
      <div class="hero-content">
        <!-- AI Breathing Icon -->
        <a href="#aiPromptSection" class="ai-breathing-icon hero-ai-icon" id="heroAiIcon" @click.prevent="scrollToAI()">
          <div class="ai-breathing-container">
            <div class="ai-glow-pulse ai-glow-primary"></div>
            <div class="ai-glow-pulse ai-glow-secondary"></div>
            <div class="ai-gradient-orb"></div>
            <div class="ai-icon-glow">
              <div class="ai-liquid-glass-icon">
                <img src="/assets/chat_veiq_icon.png" alt="VEIQ AI" class="ai-icon-image" />
              </div>
            </div>
          </div>
        </a>

        <div class="hero-eyebrow">Agentic AI for Automotive Trading</div>

        <h1 class="hero-headline">{{ store.t('hero.headline') }}</h1>

        <div class="hero-ctas">
          <button class="btn-hero-primary" @click="store.openModal()">
            {{ store.t('hero.seeDeals') }}
          </button>

          <a href="#heroAnimationSection" class="hero-stats-preview" @click.prevent="scrollToFeatures()">
            <div class="stats-preview-icon-wrapper">
              <div
                v-for="(stat, i) in statsPreview"
                :key="stat.key"
                class="stats-preview-icon"
                :class="{ active: activePreview === i }"
                :data-stat="stat.key"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <template v-if="stat.key === 'time'">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </template>
                  <template v-else-if="stat.key === 'profit'">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </template>
                  <template v-else-if="stat.key === 'turnover'">
                    <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                  </template>
                </svg>
              </div>
            </div>
            <div class="stats-preview-carousel">
              <span
                v-for="(stat, i) in statsPreview"
                :key="stat.key"
                class="stats-preview-value"
                :class="{ active: activePreview === i }"
                :data-stat="stat.key"
              >{{ stat.value }}</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Hero Images -->
      <div class="hero-image-wrapper">
        <picture>
          <source srcset="/assets/heros/mock_hero.webp" type="image/webp" />
          <img src="/assets/heros/mock_hero.png" alt="VEIQ Platform" class="hero-main-image hero-main-image-desktop" />
        </picture>
        <picture>
          <source srcset="/assets/heros/mock_hero_mobile.webp" type="image/webp" />
          <img src="/assets/heros/mock_hero_mobile.png" alt="VEIQ Platform" class="hero-main-image hero-main-image-mobile" />
        </picture>
      </div>

      <!-- Before / After Comparison -->
      <div class="hero-before-after">
        <h2 class="hero-before-after-title">{{ store.t('beforeAfter.title') }}</h2>
        <div class="before-after-comparison">
          <!-- Step 1 -->
          <div class="before-after-item">
            <div class="before-after-label-number">1</div>
            <div class="before-after-image-wrapper">
              <picture>
                <source srcset="/assets/heros/before.webp" type="image/webp" />
                <img
                  src="/assets/heros/before.png"
                  alt="Manual & Chaotic"
                  class="before-after-image"
                  loading="lazy"
                />
              </picture>
              <div class="before-after-tooltip">
                <div class="before-after-tooltip-mini">
                  <p>{{ store.t('beforeAfter.tooltip1Mini') }}</p>
                </div>
                <div class="before-after-tooltip-full">
                  <p>{{ store.t('beforeAfter.tooltip1Full') }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="before-after-divider">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="before-after-arrow">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>

          <!-- Step 2 -->
          <div class="before-after-item">
            <div class="before-after-label-number">2</div>
            <div class="before-after-image-wrapper">
              <picture>
                <source srcset="/assets/heros/after.webp" type="image/webp" />
                <img
                  src="/assets/heros/after.png"
                  alt="Clear & Ranked"
                  class="before-after-image"
                  loading="lazy"
                />
              </picture>
              <div class="before-after-tooltip">
                <div class="before-after-tooltip-mini">
                  <p>{{ store.t('beforeAfter.tooltip2Mini') }}</p>
                </div>
                <div class="before-after-tooltip-full">
                  <p>{{ store.t('beforeAfter.tooltip2Full') }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="before-after-plus">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="before-after-plus-icon">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>

          <!-- Step 3 -->
          <div class="before-after-item">
            <div class="before-after-label-number">3</div>
            <div class="before-after-image-wrapper">
              <picture>
                <source srcset="/assets/heros/after2.webp" type="image/webp" />
                <img
                  src="/assets/heros/after2.png"
                  alt="VEIQ Platform"
                  class="before-after-image"
                  loading="lazy"
                />
              </picture>
              <div class="before-after-tooltip">
                <div class="before-after-tooltip-mini">
                  <p>{{ store.t('beforeAfter.tooltip3Mini') }}</p>
                </div>
                <div class="before-after-tooltip-full">
                  <p>{{ store.t('beforeAfter.tooltip3Full') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
