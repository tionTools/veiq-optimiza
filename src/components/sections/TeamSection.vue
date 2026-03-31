<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const founders = [
  {
    name: 'Arvin Esterabadi',
    roleKey: 'team.ceo',
    image: '/assets/team/arvin2.png',
    linkedin: 'https://www.linkedin.com/in/arvin-esterabadi-b283a1166/',
    bio1Key: 'team.arvin.bio1',
    bio2Key: 'team.arvin.bio2',
  },
  {
    name: 'Christian Behn',
    roleKey: 'team.cfo',
    image: '/assets/team/chris.jpeg',
    linkedin: 'https://www.linkedin.com/in/christian-behn/',
    bio1Key: 'team.christian.bio1',
    bio2Key: 'team.christian.bio2',
  },
  {
    name: 'Marc Abels',
    roleKey: 'team.cto',
    image: '/assets/team/marc2.jpeg',
    linkedin: 'https://www.linkedin.com/in/marc-abels/',
    bio1Key: 'team.marc.bio1',
    bio2Key: 'team.marc.bio2',
  },
  {
    name: 'Machiel Tiddens',
    roleKey: 'team.commercialLead',
    image: '/assets/team/machiel.jpeg',
    linkedin: 'https://www.linkedin.com/in/machiel-tiddens-ceo/',
    bio1Key: 'team.machiel.bio1',
    bio2Key: 'team.machiel.bio2',
  },
  {
    name: 'Jingwei Ren',
    roleKey: 'team.uxLead',
    image: '/assets/team/jing2.jpeg',
    linkedin: 'https://www.linkedin.com/in/jingwei-ren-5824a948/',
    bio1Key: 'team.jingwei.bio1',
    bio2Key: 'team.jingwei.bio2',
  },
]

const advisors = [
  {
    name: 'Martin Herrmann',
    role: 'Strategic Advisor',
    image: '/assets/team/martin.jpeg',
    linkedin: 'https://www.linkedin.com/in/martin-f-herrmann-995619/',
    bio1: 'Former CEO / COO in energy & infrastructure. Board member and mentor to high-growth startups across Europe.',
  },
  {
    name: 'Alper Topcuoglu',
    role: 'Strategic Tech Advisor',
    image: '/assets/team/alper.jpeg',
    linkedin: 'https://www.linkedin.com/in/alper-t-042209107/',
    bio1: 'Senior technologist. Data engineering, data architecture, big data platforms, ML pipelines, LLM & AI infrastructure. Startups to enterprise scale.',
  },
]
</script>

<template>
  <section id="founders" class="founders-section founders-section-compact">
    <div class="section-container">
      <h2 class="section-title">{{ t('team.title') }}</h2>
      <div class="founders-grid">
        <div v-for="founder in founders" :key="founder.name" class="founder-card-compact">
          <a :href="founder.linkedin" target="_blank" rel="noopener noreferrer" class="founder-headshot-compact">
            <img :src="founder.image" :alt="founder.name" class="founder-image">
          </a>
          <h3 class="founder-name-compact">{{ founder.name }}</h3>
          <span class="founder-role-compact">{{ t(founder.roleKey) }}</span>
          <p class="founder-bio-visible">{{ t(founder.bio1Key) }}</p>
          <div class="founder-bio-popup">
            <p>{{ t(founder.bio2Key) }}</p>
            <a :href="founder.linkedin" target="_blank" rel="noopener noreferrer" class="founder-link-compact">LinkedIn →</a>
          </div>
        </div>
      </div>

      <!-- Advisors Section -->
      <div class="advisors-section-compact">
        <h3 class="advisors-title">{{ t('team.advisorsTitle') }}</h3>
        <div class="advisors-grid">
          <div v-for="advisor in advisors" :key="advisor.name" class="founder-card-compact advisor-card-compact">
            <a :href="advisor.linkedin" target="_blank" rel="noopener noreferrer" class="founder-headshot-compact advisor-headshot-compact">
              <img :src="advisor.image" :alt="advisor.name" class="founder-image">
            </a>
            <h4 class="founder-name-compact">{{ advisor.name }}</h4>
            <span class="founder-role-compact">{{ advisor.role }}</span>
            <p class="founder-bio-visible">{{ advisor.bio1 }}</p>
            <a :href="advisor.linkedin" target="_blank" rel="noopener noreferrer" class="founder-link-compact">LinkedIn →</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
