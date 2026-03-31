<script setup lang="ts">
import TeamMemberCard from '../team/TeamMemberCard.vue'

interface TeamMember {
  id: string
  imageSrc: string
  imageAlt: string
  name: string
  role: string
  roleI18n?: string
  profileUrl: string
  visibleBio: string
  visibleBioI18n?: string
  popupBio?: string
  popupBioI18n?: string
}

const founders: TeamMember[] = [
  {
    id: 'arvin',
    imageSrc: '/assets/team/arvin2.webp',
    imageAlt: 'Arvin Esterabadi',
    name: 'Arvin Esterabadi',
    role: 'Founder & CEO',
    roleI18n: 'team.ceo',
    profileUrl: 'https://www.linkedin.com/in/arvin-esterabadi-b283a1166/',
    visibleBio:
      'Serial entrepreneur with 12+ years of experience across automotive, mobility trading, e-commerce, re-commerce, and technology platforms.',
    visibleBioI18n: 'team.arvin.bio1',
    popupBio:
      'Arvin has spent his career close to the market, working with vehicle inventory, pricing, sourcing, and digital trading flows. He combines hands-on operational experience with a strong understanding of how technology can simplify complex decisions in mobility and trade.',
    popupBioI18n: 'team.arvin.bio2',
  },
  {
    id: 'christian',
    imageSrc: '/assets/team/chris.webp',
    imageAlt: 'Christian Behn',
    name: 'Christian Behn',
    role: 'Founder & CFO',
    roleI18n: 'team.cfo',
    profileUrl: 'https://www.linkedin.com/in/christian-behn/',
    visibleBio: 'Background in building and scaling tech companies across finance, SaaS, and platform businesses.',
    visibleBioI18n: 'team.christian.bio1',
    popupBio:
      'Christian has worked closely with founders and leadership teams on financial strategy, fundraising, and scale-up operations. His experience spans complex transactional models and high-growth environments, where solid financial architecture and operational discipline are critical.',
    popupBioI18n: 'team.christian.bio2',
  },
  {
    id: 'marc',
    imageSrc: '/assets/team/marc2.webp',
    imageAlt: 'Marc Abels',
    name: 'Marc Abels',
    role: 'Founder & CTO',
    roleI18n: 'team.cto',
    profileUrl: 'https://www.linkedin.com/in/marc-abels/',
    visibleBio:
      'Background in software engineering, data, and applied AI, with experience across investing and technology-driven companies.',
    visibleBioI18n: 'team.marc.bio1',
    popupBio:
      'Marc has worked hands-on with complex datasets, building data systems and intelligence layers that support real operational decisions. With a foundation in Physics and applied AI, he brings a structured, analytical approach to product and system design.',
    popupBioI18n: 'team.marc.bio2',
  },
  {
    id: 'machiel',
    imageSrc: '/assets/team/machiel.webp',
    imageAlt: 'Machiel Tiddens',
    name: 'Machiel Tiddens',
    role: 'Commercial Lead',
    roleI18n: 'team.commercialLead',
    profileUrl: 'https://www.linkedin.com/in/machiel-tiddens-ceo/',
    visibleBio: 'Over a decade of leadership experience across digital platforms and large-scale e-commerce environments.',
    visibleBioI18n: 'team.machiel.bio1',
    popupBio:
      'Machiel has led and scaled complex organizations, including serving as CEO of a high-growth marketplace business and holding senior roles within major consumer and retail platforms.',
    popupBioI18n: 'team.machiel.bio2',
  },
  {
    id: 'jingwei',
    imageSrc: '/assets/team/jing2.webp',
    imageAlt: 'Jingwei Ren',
    name: 'Jingwei Ren',
    role: 'UX Lead',
    roleI18n: 'team.uxLead',
    profileUrl: 'https://www.linkedin.com/in/jingwei-ren-5824a948/',
    visibleBio: 'Background in product, service design, and user-centered system development.',
    visibleBioI18n: 'team.jingwei.bio1',
    popupBio:
      'Jingwei has worked on designing and shaping digital platforms where complexity needs to be translated into clarity for end users. With a foundation in interaction design, he focuses on how people actually use systems in practice.',
    popupBioI18n: 'team.jingwei.bio2',
  },
]

const advisors: TeamMember[] = [
  {
    id: 'martin',
    imageSrc: '/assets/team/martin.webp',
    imageAlt: 'Martin Herrmann',
    name: 'Martin Herrmann',
    role: 'Strategic Advisor',
    profileUrl: 'https://www.linkedin.com/in/martin-f-herrmann-995619/',
    visibleBio:
      'Former CEO / COO in energy & infrastructure. Board member and mentor to high-growth startups across Europe.',
  },
  {
    id: 'alper',
    imageSrc: '/assets/team/alper.webp',
    imageAlt: 'Alper Topcuoglu',
    name: 'Alper Topcuoglu',
    role: 'Strategic Tech Advisor',
    profileUrl: 'https://www.linkedin.com/in/alper-t-042209107/',
    visibleBio:
      'Senior technologist. Data engineering, data architecture, big data platforms, ML pipelines, LLM & AI infrastructure. Startups to enterprise scale.',
  },
]
</script>

<template>
  <section id="founders" class="founders-section founders-section-compact">
    <div class="section-container">
      <h2 class="section-title" data-i18n="team.title">Team</h2>
      <div class="founders-grid">
        <TeamMemberCard
          v-for="founder in founders"
          :key="founder.id"
          :image-src="founder.imageSrc"
          :image-alt="founder.imageAlt"
          :name="founder.name"
          :role="founder.role"
          :role-i18n="founder.roleI18n"
          :profile-url="founder.profileUrl"
          :visible-bio="founder.visibleBio"
          :visible-bio-i18n="founder.visibleBioI18n"
          :popup-bio="founder.popupBio"
          :popup-bio-i18n="founder.popupBioI18n"
        />
      </div>

      <div class="advisors-section-compact">
        <h3 class="advisors-title" data-i18n="team.advisorsTitle">Advisors</h3>
        <div class="advisors-grid">
          <TeamMemberCard
            v-for="advisor in advisors"
            :key="advisor.id"
            :image-src="advisor.imageSrc"
            :image-alt="advisor.imageAlt"
            :name="advisor.name"
            :role="advisor.role"
            :profile-url="advisor.profileUrl"
            :visible-bio="advisor.visibleBio"
            :is-advisor="true"
          />
        </div>
      </div>
    </div>
  </section>
</template>
