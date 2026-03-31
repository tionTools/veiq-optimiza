<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

const form = ref({ company: '', email: '', phone: '' })
const note = ref('')
const noteColor = ref('')
const isSubmitting = ref(false)

async function onSubmit() {
  isSubmitting.value = true
  note.value = 'Sending your request...'
  noteColor.value = '#6B7280'

  const data = new FormData()
  data.append('company', form.value.company)
  data.append('email', form.value.email)
  data.append('phone', form.value.phone)

  try {
    const res = await fetch('https://formspree.io/f/xdkjnrdq', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      note.value = '✓ Demo requested! We\'ll be in touch soon to schedule.'
      noteColor.value = '#10B981'
      form.value = { company: '', email: '', phone: '' }
      setTimeout(() => store.closeModal(), 2000)
    } else {
      throw new Error('Failed')
    }
  } catch {
    note.value = 'Error sending request. Please try again or contact us directly.'
    noteColor.value = '#EF4444'
  } finally {
    isSubmitting.value = false
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') store.closeModal()
}

onMounted(() => {
  note.value = store.t('waitlist.note')
  noteColor.value = ''
  document.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div class="waitlist-modal active" id="waitlistModal">
      <div class="waitlist-modal-overlay" @click="store.closeModal()"></div>
      <div class="waitlist-modal-content">
        <button class="waitlist-modal-close" aria-label="Close modal" @click="store.closeModal()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="waitlist-modal-header">
          <h2>{{ store.t('waitlist.title') }}</h2>
          <p>{{ store.t('waitlist.description') }}</p>
        </div>

        <form class="waitlist-form" @submit.prevent="onSubmit">
          <div class="waitlist-field">
            <input
              id="waitlist-company"
              v-model="form.company"
              type="text"
              :placeholder="store.t('waitlist.companyPlaceholder')"
              required
              autocomplete="organization"
            />
          </div>
          <div class="waitlist-field">
            <input
              id="waitlist-email"
              v-model="form.email"
              type="email"
              :placeholder="store.t('waitlist.emailPlaceholder')"
              required
              autocomplete="email"
            />
          </div>
          <div class="waitlist-field">
            <input
              id="waitlist-phone"
              v-model="form.phone"
              type="tel"
              :placeholder="store.t('waitlist.phonePlaceholder')"
              required
              autocomplete="tel"
            />
          </div>

          <button type="submit" class="waitlist-submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : store.t('waitlist.submit') }}
          </button>

          <p class="waitlist-form-note" :style="noteColor ? { color: noteColor } : {}">
            {{ note }}
          </p>
        </form>
      </div>
    </div>
  </Teleport>
</template>
