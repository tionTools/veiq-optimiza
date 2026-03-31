import { onMounted } from 'vue'
import { initLandingInteractions } from '../legacy/site'

declare global {
  interface Window {
    __veiqLegacyInitialized?: boolean
  }
}

export function useLandingInteractions(): void {
  onMounted(() => {
    if (window.__veiqLegacyInitialized === true) {
      return
    }

    window.__veiqLegacyInitialized = true
    initLandingInteractions()
  })
}
