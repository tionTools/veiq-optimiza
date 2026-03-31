<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

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

interface TextMessage {
  type: 'text'
  role: 'user' | 'assistant'
  content: string
  isTyping?: boolean
}

interface DealCardsMessage {
  type: 'deal-cards'
  cards: DealCard[]
}

interface RotationCardsMessage {
  type: 'rotation-cards'
  cards: RotationCard[]
}

interface DealCardMessage {
  type: 'deal-card'
  card: DealCard & { phoneNumber?: string }
}

type Message = TextMessage | DealCardsMessage | RotationCardsMessage | DealCardMessage

const messages = ref<Message[]>([])
const messagesContainer = ref<HTMLElement | null>(null)
const sectionRef = ref<HTMLElement | null>(null)
const isExpanded = ref(false)
const demoStarted = ref(false)
const currentPlaceholder = ref(t('ai.placeholder'))

const placeholderTexts = [
  'Ask VEIQ AI anything...',
  'Show me my best deals today...',
  'Which cars have the best margin?',
  'Find deals under €8000...',
  'What are the fastest selling cars?',
]

let placeholderIndex = 0
let placeholderInterval: ReturnType<typeof setInterval> | null = null

// Card interaction states
const cardStates = reactive<Record<string, {
  isConfirming: boolean
  isCalling: boolean
  isCallCompleted: boolean
  isNegotiating: boolean
}>>({})

function getCardKey(rank: number, context: string) {
  return `${context}-${rank}`
}

function initCardState(key: string) {
  if (!cardStates[key]) {
    cardStates[key] = {
      isConfirming: false,
      isCalling: false,
      isCallCompleted: false,
      isNegotiating: false,
    }
  }
}

function handleCall(key: string, phoneNumber?: string) {
  initCardState(key)
  const state = cardStates[key]!
  if (state.isCallCompleted) return
  if (!state.isConfirming) {
    state.isConfirming = true
    return
  }
  state.isConfirming = false
  state.isCalling = true
  if (phoneNumber) {
    window.open(`tel:${phoneNumber}`)
  }
  setTimeout(() => {
    const s = cardStates[key]
    if (s) {
      s.isCalling = false
      s.isCallCompleted = true
    }
  }, 3000)
}

function handleNegotiate(key: string) {
  initCardState(key)
  const state = cardStates[key]!
  state.isNegotiating = !state.isNegotiating
}

function cancelCall(key: string) {
  if (cardStates[key]) {
    cardStates[key].isConfirming = false
  }
}

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

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function scrollToBottom() {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

async function playDemo() {
  if (demoStarted.value) return
  demoStarted.value = true
  isExpanded.value = true

  await delay(600)

  for (const step of demoConversation) {
    if ('role' in step && step.role) {
      if (step.role === 'user') {
        await delay(800)
        messages.value.push({ type: 'text', role: 'user', content: step.text })
        await scrollToBottom()
        await delay(600)
      } else if (step.role === 'assistant') {
        // Show typing indicator
        messages.value.push({ type: 'text', role: 'assistant', content: '', isTyping: true })
        await scrollToBottom()
        await delay(1200)
        // Replace typing with actual message
        messages.value.splice(messages.value.length - 1, 1, {
          type: 'text',
          role: 'assistant',
          content: step.text,
          isTyping: false,
        })
        await scrollToBottom()
      }
    } else if ('type' in step) {
      await delay(600)
      if (step.type === 'deal-cards') {
        messages.value.push({ type: 'deal-cards', cards: step.data as DealCard[] })
      } else if (step.type === 'rotation-cards') {
        messages.value.push({ type: 'rotation-cards', cards: step.data as RotationCard[] })
      } else if (step.type === 'deal-card') {
        messages.value.push({ type: 'deal-card', card: step.data as DealCard & { phoneNumber?: string } })
      }
      await scrollToBottom()
    }
  }
}

function startPlaceholderCarousel() {
  placeholderInterval = setInterval(() => {
    placeholderIndex = (placeholderIndex + 1) % placeholderTexts.length
    currentPlaceholder.value = placeholderTexts[placeholderIndex] ?? t('ai.placeholder')
  }, 3000)
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  startPlaceholderCarousel()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting && !demoStarted.value) {
        playDemo()
      }
    },
    { threshold: 0.3 }
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }

  if (window.lucide) window.lucide.createIcons()
})

onUnmounted(() => {
  if (placeholderInterval) clearInterval(placeholderInterval)
  if (observer) observer.disconnect()
})
</script>

<template>
  <section class="ai-prompt-section" id="aiPromptSection" ref="sectionRef">
    <div class="section-container">
      <div class="ai-prompt-standalone-box" :class="{ expanded: isExpanded }">
        <div class="ai-prompt-standalone-container">
          <div class="ai-prompt-standalone-header">
            <!-- AI Breathing Icon inside chat -->
            <div class="ai-breathing-icon ai-chat-icon">
              <div class="ai-breathing-container">
                <div class="ai-glow-pulse ai-glow-primary"></div>
                <div class="ai-glow-pulse ai-glow-secondary"></div>
                <div class="ai-gradient-orb"></div>
                <div class="ai-icon-glow">
                  <div class="ai-liquid-glass-icon">
                    <img src="/assets/chat_veiq_icon.png" alt="VEIQ AI" class="ai-icon-image">
                  </div>
                </div>
              </div>
            </div>
            <div class="ai-prompt-standalone-input-wrapper">
              <input
                type="text"
                class="ai-prompt-standalone-input"
                :placeholder="currentPlaceholder"
                disabled
              />
            </div>
            <button class="ai-prompt-standalone-submit">
              <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                <path d="M9 3L9 15M9 3L3 9M9 3L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="ai-prompt-standalone-expanded">
            <div class="ai-chat-demo-messages" ref="messagesContainer">
              <template v-for="(msg, index) in messages" :key="index">
                <!-- Text messages -->
                <div v-if="msg.type === 'text'" class="ai-chat-message" :class="[`ai-chat-message-${msg.role}`, { 'is-typing': msg.isTyping }]">
                  <div v-if="msg.isTyping" class="ai-typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                  <div v-else class="ai-chat-message-content">{{ msg.content }}</div>
                </div>

                <!-- Deal cards grid -->
                <div v-else-if="msg.type === 'deal-cards'" class="ai-deal-cards-grid">
                  <div
                    v-for="card in msg.cards"
                    :key="card.rank"
                    class="ai-deal-card"
                  >
                    <div class="ai-deal-card-rank">#{{ card.rank }}</div>
                    <div class="ai-deal-card-vehicle">{{ card.make }} {{ card.model }} ({{ card.year }})</div>
                    <div class="ai-deal-card-price">{{ card.price }}</div>
                    <div class="ai-deal-card-stats">
                      <span class="ai-deal-stat">
                        <i data-lucide="trending-up" class="ai-deal-stat-icon"></i>
                        {{ card.marginPotential }}
                      </span>
                      <span class="ai-deal-stat">
                        <i data-lucide="repeat" class="ai-deal-stat-icon"></i>
                        {{ card.rotationDays }}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Rotation cards -->
                <div v-else-if="msg.type === 'rotation-cards'" class="ai-rotation-cards">
                  <div
                    v-for="card in msg.cards"
                    :key="card.rank"
                    class="ai-rotation-card"
                  >
                    <div class="ai-rotation-card-rank">#{{ card.rank }}</div>
                    <div class="ai-rotation-card-title">{{ card.title }}</div>
                    <div class="ai-rotation-card-stats">
                      <span>{{ card.rotationDays }}</span>
                      <span>{{ card.price }}</span>
                      <span>{{ card.marginPotential }} margin</span>
                    </div>
                  </div>
                </div>

                <!-- Single deal card with actions -->
                <div v-else-if="msg.type === 'deal-card'" class="ai-deal-card-featured">
                  <div class="ai-deal-card-featured-header">
                    <div class="ai-deal-card-rank">#{{ msg.card.rank }}</div>
                    <div class="ai-deal-card-vehicle">{{ msg.card.make }} {{ msg.card.model }} ({{ msg.card.year }})</div>
                  </div>
                  <div class="ai-deal-card-featured-stats">
                    <div class="ai-deal-stat-row">
                      <span class="ai-deal-stat-label">Price</span>
                      <span class="ai-deal-stat-value">{{ msg.card.price }}</span>
                    </div>
                    <div class="ai-deal-stat-row">
                      <span class="ai-deal-stat-label">Margin potential</span>
                      <span class="ai-deal-stat-value">{{ msg.card.marginPotential }}</span>
                    </div>
                    <div class="ai-deal-stat-row">
                      <span class="ai-deal-stat-label">Rotation</span>
                      <span class="ai-deal-stat-value">{{ msg.card.rotationDays }}</span>
                    </div>
                  </div>
                  <div class="ai-deal-card-actions">
                    <template v-if="!cardStates[getCardKey(msg.card.rank, 'featured')]?.isCallCompleted">
                      <template v-if="!cardStates[getCardKey(msg.card.rank, 'featured')]?.isConfirming && !cardStates[getCardKey(msg.card.rank, 'featured')]?.isCalling">
                        <button
                          class="ai-deal-card-btn ai-deal-card-btn-call"
                          @click="() => { initCardState(getCardKey(msg.card.rank, 'featured')); handleCall(getCardKey(msg.card.rank, 'featured'), msg.card.phoneNumber) }"
                        >
                          <i data-lucide="phone" class="ai-btn-icon"></i>
                          Call Seller
                        </button>
                        <button
                          class="ai-deal-card-btn ai-deal-card-btn-negotiate"
                          @click="handleNegotiate(getCardKey(msg.card.rank, 'featured'))"
                        >
                          <i data-lucide="message-square" class="ai-btn-icon"></i>
                          Negotiate
                        </button>
                      </template>
                      <template v-else-if="cardStates[getCardKey(msg.card.rank, 'featured')]?.isConfirming">
                        <div class="ai-deal-card-confirm">
                          <span>Call {{ msg.card.phoneNumber }}?</span>
                          <button class="ai-deal-card-btn ai-deal-card-btn-confirm" @click="handleCall(getCardKey(msg.card.rank, 'featured'), msg.card.phoneNumber)">Confirm</button>
                          <button class="ai-deal-card-btn ai-deal-card-btn-cancel" @click="cancelCall(getCardKey(msg.card.rank, 'featured'))">Cancel</button>
                        </div>
                      </template>
                      <template v-else-if="cardStates[getCardKey(msg.card.rank, 'featured')]?.isCalling">
                        <div class="ai-deal-card-calling">
                          <i data-lucide="phone-call" class="ai-btn-icon ai-btn-icon-calling"></i>
                          Calling...
                        </div>
                      </template>
                    </template>
                    <template v-else>
                      <div class="ai-deal-card-called">
                        <i data-lucide="check-circle" class="ai-btn-icon"></i>
                        Call initiated
                      </div>
                    </template>

                    <div v-if="cardStates[getCardKey(msg.card.rank, 'featured')]?.isNegotiating" class="ai-deal-card-negotiate-panel">
                      <p>Negotiation initiated. VEIQ AI will assist you with pricing strategy based on market data.</p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
