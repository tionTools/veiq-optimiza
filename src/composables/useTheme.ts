import { ref, onMounted, onUnmounted } from 'vue'

declare global {
  interface Window {
    lucide: { createIcons(): void }
  }
}

function isDayTime(): boolean {
  const hour = new Date().getHours()
  return hour >= 7 && hour < 21
}

function getTimeBasedTheme(): 'light' | 'dark' {
  return isDayTime() ? 'light' : 'dark'
}

export function useTheme() {
  const theme = ref<'light' | 'dark'>('dark')

  function updateLogos(t: string) {
    const logoImages = document.querySelectorAll('.logo-img, .sidebar-logo-img')
    const logoFileName = t === 'dark' ? 'logo_2026.png' : 'logo_2026_black.png'
    logoImages.forEach((img) => {
      const el = img as HTMLImageElement
      const currentSrc = el.getAttribute('src') || el.src
      if (currentSrc) {
        el.src = currentSrc.replace(/logo_2026(_black)?\.png/g, logoFileName)
      } else {
        el.src = '/assets/logos/' + logoFileName
      }
    })
    const footerLogos = document.querySelectorAll('.footer-logo-img')
    footerLogos.forEach((img) => {
      const el = img as HTMLImageElement
      const currentSrc = el.getAttribute('src') || el.src
      if (currentSrc && currentSrc.includes('logo_2026_black.png')) {
        el.src = currentSrc.replace(/logo_2026_black\.png/g, 'logo_2026.png')
      }
    })
  }

  function applyTheme(t: 'light' | 'dark') {
    theme.value = t
    document.documentElement.setAttribute('data-theme', t)
    updateLogos(t)
  }

  function toggleTheme() {
    const newTheme = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    localStorage.setItem('theme-manual-override', 'true')
  }

  function getAutoTheme(): 'light' | 'dark' {
    const manualOverride = localStorage.getItem('theme-manual-override')
    if (manualOverride === 'true') {
      return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    }
    return getTimeBasedTheme()
  }

  let interval: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    const initialTheme = getAutoTheme()
    applyTheme(initialTheme)

    interval = setInterval(() => {
      const manualOverride = localStorage.getItem('theme-manual-override')
      if (manualOverride !== 'true') {
        applyTheme(getTimeBasedTheme())
      }
    }, 60000)
  })

  onUnmounted(() => {
    if (interval) clearInterval(interval)
  })

  return { theme, toggleTheme, applyTheme }
}
