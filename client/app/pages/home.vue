<script setup lang="ts">
import type { TopicCategory } from '~/types'

definePageMeta({
  middleware: 'auth',
})

type ViewState = 'welcome' | 'loading' | 'topic' | 'writing' | 'finished' | 'saved'
const viewState = ref<ViewState>('welcome')

const {
  currentTopic,
  isLoading,
  error,
  completedCount,
  fetchTopic,
  saveCompletedTopic,
  loadCompletedTopics,
  clearTopic,
} = useTopics()

const timerCompleted = ref(false)
const isSaving = ref(false)
const selectedCategory = ref<TopicCategory | undefined>(undefined)

const categoryOptions: { value: TopicCategory | undefined; label: string }[] = [
  { value: undefined, label: 'Cualquier tema' },
  { value: 'educacion', label: 'Educación' },
  { value: 'economia', label: 'Economía' },
  { value: 'politica', label: 'Política' },
  { value: 'cultura', label: 'Cultura' },
  { value: 'viajes', label: 'Viajes' },
  { value: 'mundo', label: 'Mundo' },
  { value: 'vida', label: 'Vida' },
]

const encouragementMessages = [
  '¡Guardado! Otro tema más para tu libro.',
  '¡Excelente! Tu libro crece con cada sesión.',
  '¡Qué bueno! Tus ideas quedaron registradas.',
  '¡Muy bien! Seguí sumando temas.',
  '¡Listo! Tu sabiduría sigue quedando por escrito.',
]

const savedMessage = ref('')

onMounted(() => {
  loadCompletedTopics()
})

async function handleRequestTopic() {
  viewState.value = 'loading'
  await fetchTopic(selectedCategory.value)
  viewState.value = currentTopic.value ? 'topic' : 'welcome'
}

async function handleAnotherTopic() {
  viewState.value = 'loading'
  await fetchTopic(selectedCategory.value)
  viewState.value = currentTopic.value ? 'topic' : 'welcome'
}

function startWriting() {
  timerCompleted.value = false
  viewState.value = 'writing'
}

function handleTimerFinish() {
  timerCompleted.value = true
  viewState.value = 'finished'
}

async function handleSave() {
  if (!currentTopic.value) return
  isSaving.value = true
  try {
    await saveCompletedTopic(currentTopic.value, timerCompleted.value)
  } catch {
    // Still proceed so she isn't stuck
  } finally {
    isSaving.value = false
    savedMessage.value = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
    viewState.value = 'saved'
  }
}

function handleFinishEarly() {
  timerCompleted.value = false
  viewState.value = 'finished'
}

function backToStart() {
  clearTopic()
  timerCompleted.value = false
  viewState.value = 'welcome'
}
</script>

<template>
  <div class="flex flex-col items-center gap-8">
    <!-- Welcome state -->
    <template v-if="viewState === 'welcome'">
      <UiWelcomeMessage />

      <!-- Topic count -->
      <p v-if="completedCount > 0" class="text-body text-warm-600">
        Ya escribiste sobre {{ completedCount }} {{ completedCount === 1 ? 'tema' : 'temas' }}
      </p>

      <!-- Show error with retry -->
      <p v-if="error" class="max-w-md text-center text-body text-red-600">
        {{ error }}
      </p>

      <!-- Category filter -->
      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="option in categoryOptions"
          :key="option.label"
          class="rounded-full border px-4 py-2 text-body font-medium transition-colors"
          :class="selectedCategory === option.value
            ? 'border-warm-500 bg-warm-500 text-white'
            : 'border-warm-300 bg-white text-warm-700 hover:bg-warm-100'"
          @click="selectedCategory = option.value"
        >
          {{ option.label }}
        </button>
      </div>

      <UiButton class="mt-2" @click="handleRequestTopic">
        Dame un tema
      </UiButton>
    </template>

    <!-- Loading state -->
    <template v-else-if="viewState === 'loading'">
      <div class="flex flex-col items-center gap-6 py-12">
        <div class="size-16 animate-spin rounded-full border-4 border-warm-200 border-t-warm-500" />
        <p class="text-title text-warm-600">
          Pensando un tema para vos...
        </p>
      </div>
    </template>

    <!-- Topic shown, not yet writing -->
    <template v-else-if="viewState === 'topic'">
      <UiTopicCard v-if="currentTopic" :topic="currentTopic" />

      <div class="flex gap-4">
        <UiButton variant="secondary" :loading="isLoading" @click="handleAnotherTopic">
          Otro tema
        </UiButton>
        <UiButton @click="startWriting">
          Empezar a escribir
        </UiButton>
      </div>
    </template>

    <!-- Writing state with timer -->
    <template v-else-if="viewState === 'writing'">
      <h2 v-if="currentTopic" class="text-title font-semibold text-warm-800">
        {{ currentTopic.topic }}
      </h2>

      <UiTimer auto-start @finish="handleTimerFinish" />

      <UiButton variant="ghost" size="small" @click="handleFinishEarly">
        Ya terminé
      </UiButton>
    </template>

    <!-- Finished state — save prompt -->
    <template v-else-if="viewState === 'finished'">
      <div class="flex flex-col items-center gap-6">
        <p class="text-display font-semibold text-warm-700">
          {{ timerCompleted ? '¡Muy bien!' : '¡Bien hecho!' }}
        </p>
        <p class="max-w-md text-center text-title text-warm-600">
          {{ timerCompleted ? '¿Terminaste de escribir? Guardemos este tema.' : '¿Querés guardar este tema?' }}
        </p>

        <div class="flex gap-4">
          <UiButton variant="secondary" @click="backToStart">
            No guardar
          </UiButton>
          <UiButton :loading="isSaving" @click="handleSave">
            Guardar
          </UiButton>
        </div>
      </div>
    </template>

    <!-- Saved confirmation with encouragement -->
    <template v-else-if="viewState === 'saved'">
      <div class="flex flex-col items-center gap-6 py-8">
        <p class="text-display font-semibold text-warm-700">
          {{ savedMessage }}
        </p>
        <p v-if="completedCount > 1" class="text-body text-warm-500">
          Ya van {{ completedCount }} temas en tu libro.
        </p>

        <UiButton class="mt-4" @click="backToStart">
          Seguir escribiendo
        </UiButton>
      </div>
    </template>
  </div>
</template>
