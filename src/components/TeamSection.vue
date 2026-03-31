<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const founders = computed(() => [
  {
    name: 'Arvin Esterabadi',
    role: store.t('team.ceo'),
    img: '/assets/team/arvin2.webp',
    fallback: '/assets/team/arvin2.png',
    bio1: store.t('team.arvin.bio1'),
    bio2: store.t('team.arvin.bio2'),
    linkedin: 'https://www.linkedin.com/in/arvin-esterabadi-b283a1166/',
  },
  {
    name: 'Christian Behn',
    role: store.t('team.cfo'),
    img: '/assets/team/chris.webp',
    fallback: '/assets/team/chris.jpeg',
    bio1: store.t('team.christian.bio1'),
    bio2: store.t('team.christian.bio2'),
    linkedin: 'https://www.linkedin.com/in/christian-behn/',
  },
  {
    name: 'Marc Abels',
    role: store.t('team.cto'),
    img: '/assets/team/marc2.webp',
    fallback: '/assets/team/marc2.jpeg',
    bio1: store.t('team.marc.bio1'),
    bio2: store.t('team.marc.bio2'),
    linkedin: 'https://www.linkedin.com/in/marc-abels/',
  },
  {
    name: 'Machiel Tiddens',
    role: store.t('team.commercialLead'),
    img: '/assets/team/machiel.webp',
    fallback: '/assets/team/machiel.jpeg',
    bio1: store.t('team.machiel.bio1'),
    bio2: store.t('team.machiel.bio2'),
    linkedin: 'https://www.linkedin.com/in/machiel-tiddens-ceo/',
  },
  {
    name: 'Jingwei Ren',
    role: store.t('team.uxLead'),
    img: '/assets/team/jing2.webp',
    fallback: '/assets/team/jing2.jpeg',
    bio1: store.t('team.jingwei.bio1'),
    bio2: store.t('team.jingwei.bio2'),
    linkedin: 'https://www.linkedin.com/in/jingwei-ren-5824a948/',
  },
])

const advisors = [
  {
    name: 'Martin Herrmann',
    role: 'Strategic Advisor',
    img: '/assets/team/martin.webp',
    fallback: '/assets/team/martin.jpeg',
    bio: 'Former CEO / COO in energy & infrastructure. Board member and mentor to high-growth startups across Europe.',
    linkedin: 'https://www.linkedin.com/in/martin-f-herrmann-995619/',
  },
  {
    name: 'Alper Topcuoglu',
    role: 'Strategic Tech Advisor',
    img: '/assets/team/alper.webp',
    fallback: '/assets/team/alper.jpeg',
    bio: 'Senior technologist. Data engineering, data architecture, big data platforms, ML pipelines, LLM & AI infrastructure. Startups to enterprise scale.',
    linkedin: 'https://www.linkedin.com/in/alper-t-042209107/',
  },
]
</script>

<template>
  <section id="founders" class="founders-section founders-section-compact">
    <div class="section-container">
      <h2 class="section-title">{{ store.t('team.title') }}</h2>

      <div class="founders-grid">
        <div v-for="founder in founders" :key="founder.name" class="founder-card-compact">
          <a :href="founder.linkedin" target="_blank" rel="noopener noreferrer" class="founder-headshot-compact">
            <picture>
              <source :srcset="founder.img" type="image/webp" />
              <img :src="founder.fallback" :alt="founder.name" class="founder-image" loading="lazy" />
            </picture>
          </a>
          <h3 class="founder-name-compact">{{ founder.name }}</h3>
          <span class="founder-role-compact">{{ founder.role }}</span>
          <p class="founder-bio-visible">{{ founder.bio1 }}</p>
          <div class="founder-bio-popup">
            <p>{{ founder.bio2 }}</p>
            <a :href="founder.linkedin" target="_blank" rel="noopener noreferrer" class="founder-link-compact">
              LinkedIn →
            </a>
          </div>
        </div>
      </div>

      <!-- Advisors -->
      <div class="advisors-section-compact">
        <h3 class="advisors-title">{{ store.t('team.advisorsTitle') }}</h3>
        <div class="advisors-grid">
          <div v-for="advisor in advisors" :key="advisor.name" class="founder-card-compact advisor-card-compact">
            <a :href="advisor.linkedin" target="_blank" rel="noopener noreferrer" class="founder-headshot-compact advisor-headshot-compact">
              <picture>
                <source :srcset="advisor.img" type="image/webp" />
                <img :src="advisor.fallback" :alt="advisor.name" class="founder-image" loading="lazy" />
              </picture>
            </a>
            <h4 class="founder-name-compact">{{ advisor.name }}</h4>
            <span class="founder-role-compact">{{ advisor.role }}</span>
            <p class="founder-bio-visible">{{ advisor.bio }}</p>
            <a :href="advisor.linkedin" target="_blank" rel="noopener noreferrer" class="founder-link-compact">
              LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
