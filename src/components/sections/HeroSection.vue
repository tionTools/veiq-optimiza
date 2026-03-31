<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const emit = defineEmits<{ 'open-modal': [] }>()
const { t } = useI18n()

const activeTickerIndex = ref(0)
const activeStatsBadgeIndex = ref(0)
const activeStatsPreviewIndex = ref(0)

const tickerItems = [
  { icon: 'zap', value: '612', label: 'deals analyzed today' },
  { icon: 'bar-chart-3', value: '128,463', label: 'listings analyzed' },
  { icon: 'euro', value: '€34.7M', label: 'in opportunities' },
  { icon: 'zap', value: '24', label: 'new deals today' },
  { icon: 'target', value: '88%', label: 'match accuracy' },
]

const statsBadgeItems = [
  { icon: 'clock', value: '7.5hrs', label: 'saved daily' },
  { icon: 'trending-up', value: '+23%', label: 'extra profit' },
  { icon: 'repeat', value: '+40%', label: 'more turnover' },
]

const statsPreviewItems = [
  { stat: 'time', value: '8hrs → 30min' },
  { stat: 'profit', value: '+23% profit' },
  { stat: 'turnover', value: '+40% turnover' },
]

let tickerInterval: ReturnType<typeof setInterval> | null = null
let badgeInterval: ReturnType<typeof setInterval> | null = null
let previewInterval: ReturnType<typeof setInterval> | null = null

function scrollToSection(hash: string) {
  const el = document.querySelector(hash)
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => {
  tickerInterval = setInterval(() => {
    activeTickerIndex.value = (activeTickerIndex.value + 1) % tickerItems.length
  }, 4000)

  badgeInterval = setInterval(() => {
    activeStatsBadgeIndex.value = (activeStatsBadgeIndex.value + 1) % statsBadgeItems.length
  }, 3000)

  previewInterval = setInterval(() => {
    activeStatsPreviewIndex.value = (activeStatsPreviewIndex.value + 1) % statsPreviewItems.length
  }, 3000)

  if (window.lucide) window.lucide.createIcons()
})

onUnmounted(() => {
  if (tickerInterval) clearInterval(tickerInterval)
  if (badgeInterval) clearInterval(badgeInterval)
  if (previewInterval) clearInterval(previewInterval)
})
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
          v-for="(item, index) in tickerItems"
          :key="index"
          class="market-ticker-item"
          :class="{ active: activeTickerIndex === index }"
        >
          <i :data-lucide="item.icon" class="ticker-icon-lucide"></i>
          <span class="ticker-value">{{ item.value }}</span>
          <span class="ticker-label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <!-- Stats Badge -->
    <div class="hero-stats-badge">
      <div class="stats-badge-track">
        <div
          v-for="(item, index) in statsBadgeItems"
          :key="index"
          class="stats-badge-item"
          :class="{ active: activeStatsBadgeIndex === index }"
        >
          <i :data-lucide="item.icon" class="stats-badge-icon-lucide"></i>
          <span class="stats-badge-value">{{ item.value }}</span>
          <span class="stats-badge-label">{{ item.label }}</span>
        </div>
      </div>
    </div>

    <div class="hero-container">
      <div class="hero-content">
        <!-- AI Breathing Icon -->
        <a href="#aiPromptSection" class="ai-breathing-icon hero-ai-icon" id="heroAiIcon" @click.prevent="scrollToSection('#aiPromptSection')">
          <div class="ai-breathing-container">
            <div class="ai-glow-pulse ai-glow-primary"></div>
            <div class="ai-glow-pulse ai-glow-secondary"></div>
            <div class="ai-gradient-orb"></div>
            <div class="ai-icon-glow">
              <div class="ai-liquid-glass-icon">
                <img src="/assets/chat_veiq_icon.png" alt="VEIQ AI" class="ai-icon-image">
              </div>
            </div>
          </div>
        </a>

        <div class="hero-eyebrow">
          Agentic AI for Automotive Trading
        </div>
        <h1 class="hero-headline">{{ t('hero.headline') }}</h1>
        <div class="hero-ctas">
          <button class="btn-hero-primary" @click="emit('open-modal')">{{ t('hero.seeDeals') }}</button>
          <a href="#heroAnimationSection" class="hero-stats-preview" @click.prevent="scrollToSection('#heroAnimationSection')">
            <div class="stats-preview-icon-wrapper">
              <div class="stats-preview-icon" :class="{ active: activeStatsPreviewIndex === 0 }" data-stat="time">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <div class="stats-preview-icon" :class="{ active: activeStatsPreviewIndex === 1 }" data-stat="profit">
                <i data-lucide="trending-up" class="stats-icon-lucide"></i>
              </div>
              <div class="stats-preview-icon" :class="{ active: activeStatsPreviewIndex === 2 }" data-stat="turnover">
                <i data-lucide="repeat" class="stats-icon-lucide"></i>
              </div>
            </div>
            <div class="stats-preview-carousel">
              <span
                v-for="(item, index) in statsPreviewItems"
                :key="item.stat"
                class="stats-preview-value"
                :class="{ active: activeStatsPreviewIndex === index }"
                :data-stat="item.stat"
              >{{ item.value }}</span>
            </div>
          </a>
        </div>
      </div>

      <div class="hero-image-wrapper">
        <img src="/assets/heros/mock_hero.png" alt="VEIQ Platform" class="hero-main-image hero-main-image-desktop">
        <img src="/assets/heros/mock_hero_mobile.png" alt="VEIQ Platform" class="hero-main-image hero-main-image-mobile">
      </div>

      <!-- Before/After Section -->
      <div class="hero-before-after">
        <h2 class="hero-before-after-title">{{ t('beforeAfter.title') }}</h2>
        <div class="before-after-comparison">
          <div class="before-after-item">
            <div class="before-after-label-number">1</div>
            <div class="before-after-image-wrapper">
              <img src="/assets/heros/before.png" alt="Manual & Chaotic" class="before-after-image">
              <div class="before-after-tooltip">
                <div class="before-after-tooltip-mini">
                  <p>{{ t('beforeAfter.tooltip1Mini') }}</p>
                </div>
                <div class="before-after-tooltip-full">
                  <p>{{ t('beforeAfter.tooltip1Full') }}</p>
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
              <img src="/assets/heros/after.png" alt="Clear & Ranked" class="before-after-image">
              <div class="before-after-tooltip">
                <div class="before-after-tooltip-mini">
                  <p>{{ t('beforeAfter.tooltip2Mini') }}</p>
                </div>
                <div class="before-after-tooltip-full">
                  <p>{{ t('beforeAfter.tooltip2Full') }}</p>
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
              <img src="/assets/heros/after2.png" alt="VEIQ Platform" class="before-after-image">
              <div class="before-after-tooltip">
                <div class="before-after-tooltip-mini">
                  <p>{{ t('beforeAfter.tooltip3Mini') }}</p>
                </div>
                <div class="before-after-tooltip-full">
                  <p>{{ t('beforeAfter.tooltip3Full') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
