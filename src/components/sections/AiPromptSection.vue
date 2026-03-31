<script setup lang="ts">
import AiBreathingIcon from "../common/AiBreathingIcon.vue"
</script>

<template>
  <!-- AI Prompt Section (Standalone) -->
  <section class="ai-prompt-section" id="aiPromptSection">
      <div class="section-container">
          <div class="ai-prompt-standalone-box">
              <div class="ai-prompt-standalone-container">
                  <div class="ai-prompt-standalone-header">
                  <AiBreathingIcon root-class="ai-breathing-icon ai-chat-icon" />
                      <div class="ai-prompt-standalone-input-wrapper">
                          <input type="text" class="ai-prompt-standalone-input" data-i18n-placeholder="ai.placeholder" placeholder="Ask VEIQ AI anything..." disabled />
                      </div>
                      <button class="ai-prompt-standalone-submit">
                          <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
                              <path d="M9 3L9 15M9 3L3 9M9 3L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                      </button>
                  </div>
                  <div class="ai-prompt-standalone-expanded">
                      <div class="ai-chat-demo-messages" id="aiChatDemoMessages">
                          <!-- Messages will be inserted here -->
                          </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>
