<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const usps = computed(() => [
  {
    icon: 'search-x',
    textShort: 'No more manual searching',
    textVerbose: store.t('hero.usp1Verbose'),
    detail: store.t('hero.usp1Detail'),
  },
  {
    icon: 'clock',
    textShort: 'Spend minutes, not hours',
    textVerbose: store.t('hero.usp2Verbose'),
    detail: store.t('hero.usp2Detail'),
  },
  {
    icon: 'trending-up',
    textShort: 'Make more profit per car',
    textVerbose: store.t('hero.usp3Verbose'),
    detail: store.t('hero.usp3Detail'),
  },
  {
    icon: 'zap',
    textShort: 'Buy cars that sell faster',
    textVerbose: store.t('hero.usp4Verbose'),
    detail: store.t('hero.usp4Detail'),
  },
  {
    icon: 'shield-check',
    textShort: 'Avoid slow and risky stock',
    textVerbose: store.t('hero.usp5Verbose'),
    detail: store.t('hero.usp5Detail'),
  },
  {
    icon: 'rocket',
    textShort: 'Act faster than other dealers',
    textVerbose: store.t('hero.usp6Verbose'),
    detail: store.t('hero.usp6Detail'),
  },
])

import { computed } from 'vue'

const activeUsp = ref<number | null>(null)

// Intersection Observer for scroll-triggered animation
let sectionObserver: IntersectionObserver | null = null

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  document.querySelectorAll('.hero-animation-usp-item').forEach((el) => {
    ;(el as HTMLElement).style.opacity = '0'
    sectionObserver?.observe(el)
  })
})

onUnmounted(() => {
  sectionObserver?.disconnect()
})
</script>

<template>
  <section class="hero-animation-section" id="heroAnimationSection">
    <div class="hero-animation-container">
      <div class="hero-animation-images-wrapper">
        <div class="hero-animation-image-wrapper">
          <picture>
            <source srcset="/assets/heros/2026_2.webp" type="image/webp" />
            <img src="/assets/heros/2026_2.png" alt="VEIQ Platform" class="hero-animation-image" loading="lazy" />
          </picture>
        </div>
        <div class="hero-animation-image-wrapper">
          <picture>
            <source srcset="/assets/heros/1.webp" type="image/webp" />
            <img src="/assets/heros/1.png" alt="VEIQ Platform" class="hero-animation-image" loading="lazy" />
          </picture>
        </div>
      </div>

      <div class="hero-animation-usps">
        <div
          v-for="(usp, i) in usps"
          :key="i"
          class="hero-animation-usp-item"
          :data-usp-index="i"
          @mouseenter="activeUsp = i"
          @mouseleave="activeUsp = null"
        >
          <!-- Icon -->
          <svg class="usp-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <template v-if="usp.icon === 'search-x'">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
            </template>
            <template v-else-if="usp.icon === 'clock'">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </template>
            <template v-else-if="usp.icon === 'trending-up'">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
            </template>
            <template v-else-if="usp.icon === 'zap'">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </template>
            <template v-else-if="usp.icon === 'shield-check'">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
            </template>
            <template v-else-if="usp.icon === 'rocket'">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
            </template>
          </svg>

          <span>{{ usp.textVerbose }}</span>

          <div class="usp-detail-card" v-html="usp.detail"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mobile USPs -->
  <section class="hero-usps-mobile-section">
    <div class="section-container">
      <div class="hero-usps-mobile-only">
        <div class="hero-usps-list">
          <div
            v-for="(usp, i) in usps"
            :key="i"
            class="usp-item hero-usp-clickable"
            :data-usp-index="i"
          >
            <svg class="usp-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <template v-if="usp.icon === 'search-x'">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
              </template>
              <template v-else-if="usp.icon === 'clock'">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </template>
              <template v-else-if="usp.icon === 'trending-up'">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </template>
              <template v-else-if="usp.icon === 'zap'">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </template>
              <template v-else-if="usp.icon === 'shield-check'">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
              </template>
              <template v-else-if="usp.icon === 'rocket'">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
              </template>
            </svg>
            <span class="usp-text-short">{{ usp.textShort }}</span>
            <span class="usp-text-verbose">{{ usp.textVerbose }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
