<script setup lang="ts">
import './styles/veiq.css'

import AiPromptSection from './components/sections/AiPromptSection.vue'
import HeroAnimationSection from './components/sections/HeroAnimationSection.vue'
import HeroSection from './components/sections/HeroSection.vue'
import HeroUspsMobileSection from './components/sections/HeroUspsMobileSection.vue'
import LandingFooter from './components/sections/LandingFooter.vue'
import LandingHeader from './components/sections/LandingHeader.vue'
import TeamSection from './components/sections/TeamSection.vue'
import VisionSection from './components/sections/VisionSection.vue'
import WaitlistModal from './components/sections/WaitlistModal.vue'
import { useLandingInteractions } from './composables/useLandingInteractions'

useLandingInteractions()
</script>

<template>
  <div class="veiq-page min-h-screen">
    <LandingHeader />
    <HeroSection />
    <HeroAnimationSection />
    <HeroUspsMobileSection />
    <AiPromptSection />
    <TeamSection />
    <VisionSection />
    <LandingFooter />
    <WaitlistModal />
  </div>
</template>
