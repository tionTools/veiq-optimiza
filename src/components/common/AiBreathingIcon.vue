<script setup lang="ts">
import { computed } from 'vue'

type IconTag = 'a' | 'div'

interface Props {
  rootClass: string
  iconImageClass?: string
  id?: string
  href?: string
  tag?: IconTag
}

const props = withDefaults(defineProps<Props>(), {
  iconImageClass: 'ai-icon-image',
  id: undefined,
  href: undefined,
  tag: 'div',
})

const tagBindings = computed<Record<string, string> | undefined>(() => {
  if (props.tag === 'a' && props.href) {
    return { href: props.href }
  }

  return undefined
})
</script>

<template>
  <component :is="tag" :id="id" :class="rootClass" v-bind="tagBindings">
    <div class="ai-breathing-container">
      <div class="ai-glow-pulse ai-glow-primary"></div>
      <div class="ai-glow-pulse ai-glow-secondary"></div>
      <div class="ai-gradient-orb"></div>
      <div class="ai-icon-glow">
        <div class="ai-liquid-glass-icon">
          <img src="/assets/chat_veiq_icon.png" alt="VEIQ AI" :class="iconImageClass">
        </div>
      </div>
    </div>
  </component>
</template>
