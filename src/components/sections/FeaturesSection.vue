<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const uspItems = [
  { icon: 'search-x', verboseKey: 'hero.usp1Verbose', detailKey: 'hero.usp1Detail' },
  { icon: 'clock', verboseKey: 'hero.usp2Verbose', detailKey: 'hero.usp2Detail' },
  { icon: 'trending-up', verboseKey: 'hero.usp3Verbose', detailKey: 'hero.usp3Detail' },
  { icon: 'zap', verboseKey: 'hero.usp4Verbose', detailKey: 'hero.usp4Detail' },
  { icon: 'shield-check', verboseKey: 'hero.usp5Verbose', detailKey: 'hero.usp5Detail' },
  { icon: 'rocket', verboseKey: 'hero.usp6Verbose', detailKey: 'hero.usp6Detail' },
]

onMounted(() => {
  if (window.lucide) window.lucide.createIcons()
})
</script>

<template>
  <section class="hero-animation-section" id="heroAnimationSection">
    <div class="hero-animation-container">
      <div class="hero-animation-images-wrapper">
        <div class="hero-animation-image-wrapper">
          <img src="/assets/heros/2026_2.png" alt="VEIQ Platform" class="hero-animation-image">
        </div>
        <div class="hero-animation-image-wrapper">
          <img src="/assets/heros/1.png" alt="VEIQ Platform" class="hero-animation-image">
        </div>
      </div>
      <div class="hero-animation-usps">
        <div
          v-for="(usp, index) in uspItems"
          :key="index"
          class="hero-animation-usp-item"
          :data-usp-index="index"
        >
          <i :data-lucide="usp.icon" class="usp-icon"></i>
          <span>{{ t(usp.verboseKey) }}</span>
          <div class="usp-detail-card" v-html="t(usp.detailKey)"></div>
        </div>
      </div>
    </div>
  </section>
</template>
