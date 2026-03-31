<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import AppHeader from '@/components/AppHeader.vue'
import MobileMenu from '@/components/MobileMenu.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import AiChatSection from '@/components/AiChatSection.vue'
import TeamSection from '@/components/TeamSection.vue'
import VisionSection from '@/components/VisionSection.vue'
import AppFooter from '@/components/AppFooter.vue'
import WaitlistModal from '@/components/WaitlistModal.vue'

const store = useAppStore()
</script>

<template>
  <div class="dashboard-overlay"></div>

  <AppHeader />
  <MobileMenu />

  <main>
    <HeroSection />
    <FeaturesSection />
    <AiChatSection />
    <TeamSection />
    <VisionSection />
  </main>

  <AppFooter />

  <WaitlistModal v-if="store.modalOpen" />
</template>
