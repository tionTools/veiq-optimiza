<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

const { t } = useI18n()

const company = ref('')
const email = ref('')
const phone = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)
const isError = ref(false)
const errorMessage = ref('')

watch(() => props.open, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    isSuccess.value = false
    isError.value = false
    company.value = ''
    email.value = ''
    phone.value = ''
  } else {
    document.body.style.overflow = ''
  }
})

function close() {
  emit('close')
}

function onOverlayClick(e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

async function onSubmit() {
  if (isSubmitting.value) return
  isSubmitting.value = true
  isError.value = false

  try {
    const response = await fetch('https://formspree.io/f/xdkjnrdq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        company: company.value,
        email: email.value,
        phone: phone.value,
      }),
    })

    if (response.ok) {
      isSuccess.value = true
    } else {
      isError.value = true
      errorMessage.value = 'Something went wrong. Please try again.'
    }
  } catch {
    isError.value = true
    errorMessage.value = 'Network error. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="waitlist-modal" :class="{ active: open }">
      <div class="waitlist-modal-overlay" @click="onOverlayClick"></div>
      <div class="waitlist-modal-content">
        <button class="waitlist-modal-close" aria-label="Close modal" @click="close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <div class="waitlist-modal-header">
          <h2>{{ t('waitlist.title') }}</h2>
          <p>{{ t('waitlist.description') }}</p>
        </div>

        <div v-if="isSuccess" class="waitlist-success">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: #22c55e; margin-bottom: 16px;">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3>Thank you!</h3>
          <p>We'll be in touch soon to schedule your demo.</p>
        </div>

        <form v-else class="waitlist-form" @submit.prevent="onSubmit">
          <div class="waitlist-field">
            <input
              id="waitlist-company"
              v-model="company"
              name="company"
              type="text"
              :placeholder="t('waitlist.companyPlaceholder')"
              required
              autocomplete="organization"
            />
          </div>

          <div class="waitlist-field">
            <input
              id="waitlist-email"
              v-model="email"
              name="email"
              type="email"
              :placeholder="t('waitlist.emailPlaceholder')"
              required
              autocomplete="email"
            />
          </div>

          <div class="waitlist-field">
            <input
              id="waitlist-phone"
              v-model="phone"
              name="phone"
              type="tel"
              :placeholder="t('waitlist.phonePlaceholder')"
              required
              autocomplete="tel"
            />
          </div>

          <button type="submit" class="waitlist-submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'Sending...' : t('waitlist.submit') }}
          </button>

          <p v-if="isError" class="waitlist-error-note">{{ errorMessage }}</p>
          <p class="waitlist-form-note">{{ t('waitlist.note') }}</p>
        </form>
      </div>
    </div>
  </Teleport>
</template>
