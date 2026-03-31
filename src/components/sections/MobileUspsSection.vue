<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const uspItems = [
  { icon: 'search-x', shortText: 'No more manual searching', verboseKey: 'hero.usp1Verbose' },
  { icon: 'clock', shortText: 'Spend minutes, not hours', verboseKey: 'hero.usp2Verbose' },
  { icon: 'trending-up', shortText: 'Make more profit per car', verboseKey: 'hero.usp3Verbose' },
  { icon: 'zap', shortText: 'Buy cars that sell faster', verboseKey: 'hero.usp4Verbose' },
  { icon: 'shield-check', shortText: 'Avoid slow and risky stock', verboseKey: 'hero.usp5Verbose' },
  { icon: 'rocket', shortText: 'Get deals faster than others', verboseKey: 'hero.usp6Verbose' },
]

onMounted(() => {
  if (window.lucide) window.lucide.createIcons()
})
</script>

<template>
  <section class="hero-usps-mobile-section">
    <div class="section-container">
      <div class="hero-usps-mobile-only">
        <div class="hero-usps-list">
          <div
            v-for="(usp, index) in uspItems"
            :key="index"
            class="usp-item hero-usp-clickable"
            :data-usp-index="index"
          >
            <i :data-lucide="usp.icon" class="usp-icon"></i>
            <span class="usp-text-short">{{ usp.shortText }}</span>
            <span class="usp-text-verbose">{{ t(usp.verboseKey) }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
