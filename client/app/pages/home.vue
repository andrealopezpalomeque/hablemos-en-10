<script setup lang="ts">
import type { Topic } from '~/types'

definePageMeta({
  middleware: 'auth',
})

// Placeholder topic to showcase the UI (will come from API in Phase 5)
const placeholderTopic: Topic = {
  topic: 'Los Carnavales de Corrientes',
  keywords: ['comparsa', 'corso', 'disfraz', 'murga', 'tablado', 'alegría'],
  questions: [
    '¿Qué sentías cuando escuchabas la música del carnaval?',
    '¿Cómo cambió el carnaval desde que eras joven hasta hoy?',
    '¿Qué opinás sobre cómo se vive el carnaval ahora?',
  ],
  category: 'cultura',
}

type ViewState = 'welcome' | 'topic' | 'writing'
const viewState = ref<ViewState>('welcome')

function showTopic() {
  viewState.value = 'topic'
}

function startWriting() {
  viewState.value = 'writing'
}

function backToWelcome() {
  viewState.value = 'welcome'
}
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <!-- Welcome state -->
    <template v-if="viewState === 'welcome'">
      <UiWelcomeMessage />

      <UiButton class="mt-4" @click="showTopic">
        Dame un tema
      </UiButton>
    </template>

    <!-- Topic shown, not yet writing -->
    <template v-else-if="viewState === 'topic'">
      <UiTopicCard :topic="placeholderTopic" />

      <div class="flex gap-4">
        <UiButton variant="secondary" @click="backToWelcome">
          Otro tema
        </UiButton>
        <UiButton @click="startWriting">
          Empezar a escribir
        </UiButton>
      </div>
    </template>

    <!-- Writing state with timer -->
    <template v-else-if="viewState === 'writing'">
      <h2 class="text-title font-semibold text-warm-800">
        {{ placeholderTopic.topic }}
      </h2>

      <UiTimer auto-start />

      <UiButton variant="ghost" size="small" @click="backToWelcome">
        Volver al inicio
      </UiButton>
    </template>
  </div>
</template>
