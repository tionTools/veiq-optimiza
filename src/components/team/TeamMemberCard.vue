<script setup lang="ts">
interface Props {
  imageSrc: string
  imageAlt: string
  name: string
  role: string
  profileUrl: string
  visibleBio: string
  popupBio?: string
  isAdvisor?: boolean
  roleI18n?: string
  visibleBioI18n?: string
  popupBioI18n?: string
}

const props = withDefaults(defineProps<Props>(), {
  popupBio: '',
  isAdvisor: false,
  roleI18n: '',
  visibleBioI18n: '',
  popupBioI18n: '',
})
</script>

<template>
  <div class="founder-card-compact" :class="{ 'advisor-card-compact': isAdvisor }">
    <a
      :href="profileUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="founder-headshot-compact"
      :class="{ 'advisor-headshot-compact': isAdvisor }"
    >
      <img :src="imageSrc" :alt="imageAlt" class="founder-image">
    </a>

    <component :is="isAdvisor ? 'h4' : 'h3'" class="founder-name-compact">{{ name }}</component>

    <span
      class="founder-role-compact"
      :data-i18n="roleI18n || undefined"
    >
      {{ role }}
    </span>

    <p class="founder-bio-visible" :data-i18n="visibleBioI18n || undefined">{{ visibleBio }}</p>

    <div v-if="popupBio" class="founder-bio-popup">
      <p :data-i18n="popupBioI18n || undefined">{{ popupBio }}</p>
      <a :href="profileUrl" target="_blank" rel="noopener noreferrer" class="founder-link-compact">LinkedIn →</a>
    </div>

    <a
      v-else
      :href="profileUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="founder-link-compact"
    >
      LinkedIn →
    </a>
  </div>
</template>
