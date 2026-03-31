<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'

const store = useAppStore()

// --- Types ---
interface TextMessage {
  type: 'text'
  role: 'user' | 'assistant'
  text: string
  typing?: boolean
}
interface DealCard {
  rank: number
  make: string
  model: string
  year: number
  price: string
  marginPotential: string
  rotationDays: string
  phoneNumber?: string
}
interface RotationCard {
  rank: number
  title: string
  rotationDays: string
  price: string
  marginPotential: string
}
interface DealCardsMessage {
  type: 'deal-cards'
  cards: DealCard[]
}
interface DealCardMessage {
  type: 'deal-card'
  data: DealCard
  isConfirming?: boolean
  isCalling?: boolean
  isNegotiating?: boolean
  callSuccess?: boolean
  negotiationSuccess?: boolean
  negotiationMessages?: string[]
}
interface RotationCardsMessage {
  type: 'rotation-cards'
  cards: RotationCard[]
}
type ChatMessage = TextMessage | DealCardsMessage | DealCardMessage | RotationCardsMessage

const messages = ref<ChatMessage[]>([])
const messagesContainer = ref<HTMLElement | null>(null)
const inputValue = ref('')
const isBoxOpen = ref(false)
const hasDemoPlayed = ref(false)
const isDemoPlaying = ref(false)

// Suggested questions carousel
const suggestedQuestions = [
  'Hi Marvin, can you show me my deal matches of today?',
  'Find underpriced BMWs I can flip this week',
  'Select cars with the best margins from last month',
  'Identify the fastest-selling models this month',
  'Compare pricing trends for BMW vs Audi',
]

// Demo conversation script
const demoConversation = [
  { role: 'user', text: 'Hi Marvin, can you show me my deal matches of today?' },
  { role: 'assistant', text: 'Yes, here are your matches of today.' },
  {
    type: 'deal-cards',
    data: [
      { rank: 1, make: 'Toyota', model: 'iQ', year: 2010, price: '€5,600', marginPotential: '38%', rotationDays: '42 days' },
      { rank: 2, make: 'Opel', model: 'Astra', year: 2011, price: '€5,800', marginPotential: '59%', rotationDays: '28 days' },
      { rank: 3, make: 'Daihatsu', model: 'Terios', year: 2007, price: '€6,950', marginPotential: '32%', rotationDays: '15 days' },
      { rank: 4, make: 'Volkswagen', model: 'Golf', year: 2012, price: '€8,200', marginPotential: '45%', rotationDays: '35 days' },
      { rank: 5, make: 'Ford', model: 'Focus', year: 2013, price: '€7,500', marginPotential: '41%', rotationDays: '22 days' },
      { rank: 6, make: 'BMW', model: '1 Series', year: 2014, price: '€12,800', marginPotential: '52%', rotationDays: '18 days' },
    ],
  },
  { role: 'user', text: 'Can you show me the top 3 with the highest rotation days?' },
  { role: 'assistant', text: 'Yes, here are the top 3 with the highest rotation days.' },
  {
    type: 'rotation-cards',
    data: [
      { rank: 1, title: 'Toyota iQ (2010)', rotationDays: '42 days', price: '€5,600', marginPotential: '38%' },
      { rank: 2, title: 'Opel Astra (2011)', rotationDays: '28 days', price: '€5,800', marginPotential: '59%' },
      { rank: 3, title: 'Daihatsu Terios (2007)', rotationDays: '15 days', price: '€6,950', marginPotential: '32%' },
    ],
  },
  { role: 'user', text: 'Which one has the highest margin potential?' },
  { role: 'assistant', text: 'The Opel Astra (2011) - 59% margin potential, €5,800, 28 days rotation. Best option from the top 3.' },
  { role: 'user', text: 'Super, open that second one and let me contact the seller.' },
  { role: 'assistant', text: 'Opening the second one now.' },
  {
    type: 'deal-card',
    data: { rank: 2, make: 'Opel', model: 'Astra', year: 2011, price: '€5,800', marginPotential: '59%', rotationDays: '28 days', phoneNumber: '+31612345678' },
  },
]

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// Typing animation for input
let typingInterval: ReturnType<typeof setInterval> | null = null
let carouselTimeout: ReturnType<typeof setTimeout> | null = null
let isCarouselActive = false
let currentQuestionIndex = 0

function stopCarousel() {
  if (typingInterval) { clearInterval(typingInterval); typingInterval = null }
  if (carouselTimeout) { clearTimeout(carouselTimeout); carouselTimeout = null }
  isCarouselActive = false
}

async function typeText(text: string, speed = 30): Promise<void> {
  return new Promise((resolve) => {
    let index = 0
    inputValue.value = ''
    typingInterval = setInterval(() => {
      if (!isCarouselActive || index >= text.length) {
        if (typingInterval) { clearInterval(typingInterval); typingInterval = null }
        resolve()
        return
      }
      inputValue.value = text.substring(0, index + 1)
      index++
    }, speed)
  })
}

async function clearText(speed = 15): Promise<void> {
  return new Promise((resolve) => {
    const text = inputValue.value
    if (!text) { resolve(); return }
    let index = text.length
    const clearInt = setInterval(() => {
      if (!isCarouselActive || index <= 0) {
        clearInterval(clearInt)
        inputValue.value = ''
        resolve()
        return
      }
      index--
      inputValue.value = text.substring(0, index)
    }, speed)
  })
}

async function runCarousel() {
  while (isCarouselActive) {
    const question = suggestedQuestions[currentQuestionIndex]
    currentQuestionIndex = (currentQuestionIndex + 1) % suggestedQuestions.length
    await typeText(question ?? '')
    if (!isCarouselActive) break
    await new Promise((resolve) => { carouselTimeout = setTimeout(resolve, 2500) })
    if (!isCarouselActive) break
    await clearText()
    if (!isCarouselActive) break
    await new Promise((resolve) => { carouselTimeout = setTimeout(resolve, 500) })
  }
}

function startCarousel() {
  if (isCarouselActive || isDemoPlaying.value) return
  isCarouselActive = true
  currentQuestionIndex = Math.floor(Math.random() * suggestedQuestions.length)
  setTimeout(() => { if (isCarouselActive) runCarousel() }, 500)
}

// Demo conversation playback
async function startDemo() {
  if (hasDemoPlayed.value || isDemoPlaying.value) return
  hasDemoPlayed.value = true
  isDemoPlaying.value = true
  stopCarousel()

  // Type the first question into input
  const firstQ = (demoConversation[0] as { role: string; text: string }).text
  let idx = 0
  inputValue.value = ''
  await new Promise<void>((resolve) => {
    const iv = setInterval(() => {
      if (idx < firstQ.length) {
        inputValue.value = firstQ.substring(0, idx + 1)
        idx++
      } else {
        clearInterval(iv)
        resolve()
      }
    }, 40)
  })
  await sleep(800)
  inputValue.value = ''
  await sleep(300)

  // Play through conversation
  for (let i = 0; i < demoConversation.length; i++) {
    const msg = demoConversation[i] as any
    if (!isDemoPlaying.value) break

    if (msg.type === 'deal-cards') {
      messages.value.push({ type: 'deal-cards', cards: msg.data })
      await scrollToBottom()
      await sleep(1200)
    } else if (msg.type === 'rotation-cards') {
      messages.value.push({ type: 'rotation-cards', cards: msg.data })
      await scrollToBottom()
      await sleep(1200)
    } else if (msg.type === 'deal-card') {
      messages.value.push({ type: 'deal-card', data: msg.data })
      await scrollToBottom()
      await sleep(1200)
    } else if (msg.role === 'user') {
      messages.value.push({ type: 'text', role: 'user', text: msg.text })
      await scrollToBottom()
    } else if (msg.role === 'assistant') {
      // typing indicator
      messages.value.push({ type: 'text', role: 'assistant', text: '', typing: true })
      await scrollToBottom()
      const delay = 200 + Math.random() * 200
      await sleep(delay)
      // replace typing with actual message
      const last = messages.value[messages.value.length - 1] as TextMessage
      last.typing = false
      last.text = msg.text
      await scrollToBottom()
      await sleep(2000 + Math.random() * 2000)
    }
  }
  isDemoPlaying.value = false
}

// Intersection observer to open chat
let observer: IntersectionObserver | null = null
const boxRef = ref<HTMLElement | null>(null)

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isBoxOpen.value) {
          isBoxOpen.value = true
          startCarousel()
          setTimeout(() => { startDemo() }, 600)
          observer?.disconnect()
        }
      })
    },
    { threshold: 0.35 },
  )
  if (boxRef.value) observer.observe(boxRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  stopCarousel()
  isDemoPlaying.value = false
})

// Deal card interactions
function onCallClick(msg: DealCardMessage) {
  msg.isConfirming = true
}
function onCallConfirm(msg: DealCardMessage) {
  msg.isConfirming = false
  msg.isCalling = true
  setTimeout(() => {
    msg.isCalling = false
    msg.callSuccess = true
  }, 2000)
}
function onCallCancel(msg: DealCardMessage) {
  msg.isConfirming = false
}
function onNegotiateClick(msg: DealCardMessage) {
  if (msg.isCalling || msg.isConfirming) return
  msg.isNegotiating = true
  msg.negotiationMessages = []
  const steps = [
    'Analyzing market data...',
    'Preparing negotiation strategy...',
    'Contacting seller...',
    'Negotiation complete! Seller accepted €5,400 (-6.9%)',
  ]
  let i = 0
  const iv = setInterval(() => {
    if (i < steps.length) {
      msg.negotiationMessages!.push(steps[i] ?? '')
      i++
      scrollToBottom()
    } else {
      clearInterval(iv)
      msg.negotiationSuccess = true
    }
  }, 1200)
}
</script>

<template>
  <section class="ai-prompt-section" id="aiPromptSection">
    <div class="section-container">
      <div
        ref="boxRef"
        class="ai-prompt-standalone-box"
        :class="{ 'is-open': isBoxOpen }"
      >
        <div class="ai-prompt-standalone-container">
          <!-- Header / Input Row -->
          <div class="ai-prompt-standalone-header">
            <div class="ai-breathing-icon ai-chat-icon">
              <div class="ai-breathing-container">
                <div class="ai-glow-pulse ai-glow-primary"></div>
                <div class="ai-glow-pulse ai-glow-secondary"></div>
                <div class="ai-gradient-orb"></div>
                <div class="ai-icon-glow">
                  <div class="ai-liquid-glass-icon">
                    <img src="/assets/chat_veiq_icon.png" alt="VEIQ AI" class="ai-icon-image" />
                  </div>
                </div>
              </div>
            </div>

            <div class="ai-prompt-standalone-input-wrapper">
              <input
                type="text"
                class="ai-prompt-standalone-input"
                :placeholder="store.t('ai.placeholder')"
                v-model="inputValue"
                disabled
              />
            </div>

            <button class="ai-prompt-standalone-submit">
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                <path d="M9 3L9 15M9 3L3 9M9 3L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <!-- Expanded Chat Messages -->
          <div class="ai-prompt-standalone-expanded">
            <div class="ai-chat-demo-messages" ref="messagesContainer">
              <template v-for="(msg, i) in messages" :key="i">
                <!-- Text message -->
                <template v-if="msg.type === 'text'">
                  <div
                    v-if="(msg as TextMessage).typing"
                    class="typing-indicator"
                  >
                    <span></span><span></span><span></span>
                  </div>
                  <div
                    v-else
                    class="chat-message"
                    :class="(msg as TextMessage).role + '-message'"
                  >
                    <p class="chat-message-text">{{ (msg as TextMessage).text }}</p>
                  </div>
                </template>

                <!-- Deal cards grid -->
                <template v-else-if="msg.type === 'deal-cards'">
                  <div class="chat-message assistant-message ai-chat-rotation-cards">
                    <div class="ai-rotation-cards-grid">
                      <div
                        v-for="card in (msg as DealCardsMessage).cards"
                        :key="card.rank"
                        class="ai-rotation-card"
                      >
                        <div class="ai-rotation-card-title">{{ card.rank }}. {{ card.year }} {{ card.make }} {{ card.model }}</div>
                        <div class="ai-rotation-card-rows">
                          <div class="ai-rotation-card-row">
                            <span class="ai-rotation-card-label">Price</span>
                            <span class="ai-rotation-card-value">{{ card.price }}</span>
                          </div>
                          <div class="ai-rotation-card-row">
                            <span class="ai-rotation-card-label">Margin potential</span>
                            <span class="ai-rotation-card-value is-positive">{{ card.marginPotential }}</span>
                          </div>
                          <div class="ai-rotation-card-row">
                            <span class="ai-rotation-card-label">Rotation</span>
                            <span class="ai-rotation-card-value">{{ card.rotationDays }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Rotation cards -->
                <template v-else-if="msg.type === 'rotation-cards'">
                  <div class="chat-message assistant-message ai-chat-rotation-cards">
                    <div class="ai-rotation-cards-grid">
                      <div
                        v-for="card in (msg as RotationCardsMessage).cards"
                        :key="card.rank"
                        class="ai-rotation-card"
                      >
                        <div class="ai-rotation-card-title">{{ card.rank }}. {{ card.title }}</div>
                        <div class="ai-rotation-card-rows">
                          <div class="ai-rotation-card-row">
                            <span class="ai-rotation-card-label">Rotation</span>
                            <span class="ai-rotation-card-value">{{ card.rotationDays }}</span>
                          </div>
                          <div class="ai-rotation-card-row">
                            <span class="ai-rotation-card-label">Price</span>
                            <span class="ai-rotation-card-value">{{ card.price }}</span>
                          </div>
                          <div class="ai-rotation-card-row">
                            <span class="ai-rotation-card-label">Margin potential</span>
                            <span class="ai-rotation-card-value is-positive">{{ card.marginPotential }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- Single deal card with actions -->
                <template v-else-if="msg.type === 'deal-card'">
                  <div
                    class="chat-message assistant-message ai-chat-deal-card"
                    :class="{
                      'is-confirming': (msg as DealCardMessage).isConfirming,
                      'is-calling': (msg as DealCardMessage).isCalling,
                      'is-negotiating': (msg as DealCardMessage).isNegotiating,
                    }"
                  >
                    <div class="ai-chat-deal-card-header">
                      <span class="ai-chat-deal-badge">Selected match</span>
                      <span class="ai-chat-deal-rank">#{{ (msg as DealCardMessage).data.rank }}</span>
                    </div>
                    <div class="ai-chat-deal-title">{{ (msg as DealCardMessage).data.year }} {{ (msg as DealCardMessage).data.make }} {{ (msg as DealCardMessage).data.model }}</div>
                    <div class="ai-chat-deal-grid">
                      <div class="ai-chat-deal-item">
                        <span class="ai-chat-deal-label">Price</span>
                        <span class="ai-chat-deal-value">{{ (msg as DealCardMessage).data.price }}</span>
                      </div>
                      <div class="ai-chat-deal-item">
                        <span class="ai-chat-deal-label">Margin potential</span>
                        <span class="ai-chat-deal-value is-positive">{{ (msg as DealCardMessage).data.marginPotential }}</span>
                      </div>
                      <div class="ai-chat-deal-item">
                        <span class="ai-chat-deal-label">Rotation days</span>
                        <span class="ai-chat-deal-value">{{ (msg as DealCardMessage).data.rotationDays }}</span>
                      </div>
                    </div>

                    <!-- Success states -->
                    <div v-if="(msg as DealCardMessage).callSuccess" class="ai-chat-call-success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Call initiated successfully!
                    </div>
                    <div v-else-if="(msg as DealCardMessage).negotiationSuccess" class="ai-chat-negotiate-success">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Negotiation complete!
                    </div>

                    <!-- Negotiation messages -->
                    <div v-if="(msg as DealCardMessage).negotiationMessages?.length" class="ai-chat-negotiate-messages">
                      <p v-for="(nm, ni) in (msg as DealCardMessage).negotiationMessages" :key="ni" class="ai-chat-negotiate-step">
                        {{ nm }}
                      </p>
                    </div>

                    <!-- Action buttons -->
                    <div v-if="!(msg as DealCardMessage).callSuccess && !(msg as DealCardMessage).negotiationSuccess" class="ai-chat-deal-actions">
                      <div class="ai-chat-deal-actions-row">
                        <button
                          class="ai-chat-call-button"
                          type="button"
                          @click="onCallClick(msg as DealCardMessage)"
                        >
                          <svg class="ai-chat-button-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.3a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.55l3-.02a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.1a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                          <span>Call seller</span>
                        </button>
                        <button
                          class="ai-chat-negotiate-button"
                          type="button"
                          @click="onNegotiateClick(msg as DealCardMessage)"
                        >
                          <svg class="ai-chat-button-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                          </svg>
                          <span>Negotiate for me</span>
                        </button>
                      </div>

                      <!-- Call confirm -->
                      <div v-if="(msg as DealCardMessage).isConfirming" class="ai-chat-call-confirm">
                        <div class="ai-chat-call-confirm-text">Call the seller now?</div>
                        <div class="ai-chat-call-confirm-actions">
                          <button class="ai-chat-call-confirm-button" type="button" @click="onCallConfirm(msg as DealCardMessage)">Call now</button>
                          <button class="ai-chat-call-cancel-button" type="button" @click="onCallCancel(msg as DealCardMessage)">Cancel</button>
                        </div>
                      </div>

                      <!-- Calling status -->
                      <div v-if="(msg as DealCardMessage).isCalling" class="ai-chat-call-status">
                        <span class="ai-chat-call-spinner"></span>
                        <span class="ai-chat-call-status-text">Calling seller...</span>
                      </div>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
