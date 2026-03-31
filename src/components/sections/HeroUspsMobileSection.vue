<script setup lang="ts">
interface UspItem {
  index: number
  icon: string
  short: string
  verbose: string
  i18n: string
  verboseI18n: string
}

const uspItems: UspItem[] = [
  {
    index: 0,
    icon: 'search-x',
    short: 'No more manual searching',
    verbose: 'Deals come to you: no more searching',
    i18n: 'hero.usp1',
    verboseI18n: 'hero.usp1Verbose',
  },
  {
    index: 1,
    icon: 'clock',
    short: 'Spend minutes, not hours',
    verbose: 'Spend minutes, not hours, finding cars',
    i18n: 'hero.usp2',
    verboseI18n: 'hero.usp2Verbose',
  },
  {
    index: 2,
    icon: 'trending-up',
    short: 'Make more profit per car',
    verbose: 'Make more profit per car',
    i18n: 'hero.usp3',
    verboseI18n: 'hero.usp3Verbose',
  },
  {
    index: 3,
    icon: 'zap',
    short: 'Buy cars that sell faster',
    verbose: 'Buy cars that sell faster',
    i18n: 'hero.usp4',
    verboseI18n: 'hero.usp4Verbose',
  },
  {
    index: 4,
    icon: 'shield-check',
    short: 'Avoid slow and risky stock',
    verbose: 'Avoid slow and risky stock',
    i18n: 'hero.usp5',
    verboseI18n: 'hero.usp5Verbose',
  },
  {
    index: 5,
    icon: 'rocket',
    short: 'Get deals faster than others',
    verbose: 'Act faster than other dealers',
    i18n: 'hero.usp6',
    verboseI18n: 'hero.usp6Verbose',
  },
]
</script>

<template>
  <section class="hero-usps-mobile-section">
    <div class="section-container">
      <div class="hero-usps-mobile-only">
        <div class="hero-usps-list">
          <div
            v-for="item in uspItems"
            :key="item.index"
            class="usp-item hero-usp-clickable"
            :data-usp-index="item.index"
            :data-i18n="item.i18n"
          >
            <i :data-lucide="item.icon" class="usp-icon"></i>
            <span class="usp-text-short">{{ item.short }}</span>
            <span class="usp-text-verbose" :data-i18n="item.verboseI18n">{{ item.verbose }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
