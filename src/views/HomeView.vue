<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import FeaturesSection from '@/components/sections/FeaturesSection.vue'
import MobileUspsSection from '@/components/sections/MobileUspsSection.vue'
import AiChatSection from '@/components/sections/AiChatSection.vue'
import TeamSection from '@/components/sections/TeamSection.vue'
import VisionSection from '@/components/sections/VisionSection.vue'
import WaitlistModal from '@/components/WaitlistModal.vue'

const modalOpen = ref(false)
</script>

<template>
  <div class="dashboard-overlay"></div>
  <AppHeader @open-modal="modalOpen = true" />
  <HeroSection @open-modal="modalOpen = true" />
  <FeaturesSection />
  <MobileUspsSection />
  <AiChatSection />
  <TeamSection />
  <VisionSection />
  <AppFooter />
  <WaitlistModal :open="modalOpen" @close="modalOpen = false" />
</template>
