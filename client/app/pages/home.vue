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
  { value: undefined, label: 'Cualquier tópico' },
  { value: 'educacion', label: 'Educación' },
  { value: 'economia', label: 'Economía' },
  { value: 'politica', label: 'Política' },
  { value: 'cultura', label: 'Cultura' },
  { value: 'viajes', label: 'Viajes' },
  { value: 'mundo', label: 'Mundo' },
  { value: 'vida', label: 'Vida' },
]

const ctaLabel = computed(() => {
  if (!selectedCategory.value) return 'Dame un tema'
  const selected = categoryOptions.find((o) => o.value === selectedCategory.value)
  return `Dame un tema de ${selected?.label}`
})

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
  // Gentle vibration on tablet when timer ends
  if (navigator.vibrate) {
    navigator.vibrate([200, 100, 200])
  }
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
    <Transition name="fade-slide" mode="out-in">
      <!-- Welcome state -->
      <div v-if="viewState === 'welcome'" key="welcome" class="flex flex-col items-center gap-8">
        <UiWelcomeMessage />

        <!-- Topic count -->
        <p v-if="completedCount > 0" class="text-base text-warm-700">
          Ya escribiste sobre <strong class="font-bold text-warm-500">{{ completedCount }} {{ completedCount === 1 ? 'tema' : 'temas' }}</strong>
        </p>

        <!-- Show error with retry -->
        <p v-if="error" class="max-w-md text-center text-body text-red-600" role="alert">
          {{ error }}
        </p>

        <!-- Category filter -->
        <div class="flex flex-wrap justify-center gap-2.5" role="radiogroup" aria-label="Categoría del tema">
          <button
            v-for="option in categoryOptions"
            :key="option.label"
            role="radio"
            :aria-checked="selectedCategory === option.value"
            class="rounded-full border px-5 py-2.5 text-base font-semibold transition-all duration-200"
            :class="selectedCategory === option.value
              ? 'border-warm-500 bg-warm-500 text-white shadow-md shadow-warm-500/20'
              : 'border-warm-300 bg-white text-warm-700 hover:border-warm-500 hover:text-warm-500'"
            @click="selectedCategory = option.value"
          >
            {{ option.label }}
          </button>
        </div>

        <UiButton class="mt-4" @click="handleRequestTopic">
          {{ ctaLabel }}
        </UiButton>
      </div>

      <!-- Loading skeleton -->
      <div v-else-if="viewState === 'loading'" key="loading" class="flex w-full flex-col items-center gap-6 py-8">
        <div class="w-full max-w-lg animate-pulse rounded-3xl border border-warm-200 bg-white p-7 md:p-9" aria-busy="true" aria-label="Generando tema...">
          <div class="h-6 w-24 rounded-full bg-warm-100" />
          <div class="mt-5 h-8 w-3/4 rounded-lg bg-warm-100" />
          <div class="mt-5 h-[3px] w-12 rounded-full bg-warm-100" />
          <div class="mt-5 flex gap-2.5">
            <div class="h-10 w-20 rounded-full bg-warm-50" />
            <div class="h-10 w-24 rounded-full bg-warm-50" />
            <div class="h-10 w-16 rounded-full bg-warm-50" />
            <div class="h-10 w-20 rounded-full bg-warm-50" />
          </div>
          <div class="mt-7 space-y-4">
            <div class="flex gap-3.5">
              <div class="size-7 shrink-0 rounded-full bg-warm-100" />
              <div class="h-5 flex-1 rounded bg-warm-50" />
            </div>
            <div class="flex gap-3.5">
              <div class="size-7 shrink-0 rounded-full bg-warm-100" />
              <div class="h-5 w-5/6 rounded bg-warm-50" />
            </div>
            <div class="flex gap-3.5">
              <div class="size-7 shrink-0 rounded-full bg-warm-100" />
              <div class="h-5 w-4/6 rounded bg-warm-50" />
            </div>
          </div>
        </div>
        <p class="text-title text-warm-700">
          Pensando un tema para vos...
        </p>
      </div>

      <!-- Topic shown, not yet writing -->
      <div v-else-if="viewState === 'topic'" key="topic" class="flex flex-col items-center gap-8">
        <UiTopicCard v-if="currentTopic" :topic="currentTopic" />

        <div class="flex gap-4">
          <UiButton variant="ghost" :loading="isLoading" @click="handleAnotherTopic">
            Otro tema
          </UiButton>
          <UiButton @click="startWriting">
            Empezar a escribir
          </UiButton>
        </div>
      </div>

      <!-- Writing state with timer + full topic -->
      <div v-else-if="viewState === 'writing'" key="writing" class="flex w-full flex-col items-center gap-6">
        <UiTimer auto-start @finish="handleTimerFinish" />

        <UiTopicCard v-if="currentTopic" :topic="currentTopic" />

        <UiButton variant="secondary" size="small" @click="handleFinishEarly">
          Ya terminé
        </UiButton>
      </div>

      <!-- Finished state — save prompt -->
      <div v-else-if="viewState === 'finished'" key="finished" class="flex flex-col items-center gap-6 py-8">
        <p class="text-6xl">
          ✍️
        </p>
        <p class="font-heading text-display font-bold text-warm-900">
          {{ timerCompleted ? '¡Tiempo cumplido!' : '¡Bien hecho!' }}
        </p>
        <p class="max-w-md text-center text-body text-warm-700">
          {{ timerCompleted ? 'Muy bien, ¿terminaste? Podés seguir escribiendo si querés, o guardar este tema.' : '¿Querés guardar este tema?' }}
        </p>

        <div class="flex gap-4">
          <UiButton variant="ghost" @click="backToStart">
            No guardar
          </UiButton>
          <UiButton :loading="isSaving" @click="handleSave">
            Guardar tema
          </UiButton>
        </div>
      </div>

      <!-- Saved confirmation with encouragement -->
      <div v-else-if="viewState === 'saved'" key="saved" class="flex flex-col items-center gap-6 py-8">
        <div class="flex size-[72px] items-center justify-center rounded-full bg-green-50 text-4xl text-green-600">
          ✓
        </div>
        <p class="font-heading text-display font-bold text-warm-900">
          ¡Tema guardado!
        </p>
        <p class="max-w-sm text-center text-body text-warm-700">
          {{ savedMessage }}
        </p>
        <p v-if="completedCount > 1" class="text-base text-warm-700">
          Ya van <strong class="font-bold text-warm-500">{{ completedCount }} temas</strong> en tu libro.
        </p>

        <div class="mt-4 flex flex-col gap-3 text-center">
          <UiButton @click="handleRequestTopic">
            Escribir otro tema
          </UiButton>
          <UiButton variant="ghost" @click="backToStart">
            Volver al inicio
          </UiButton>
        </div>
      </div>
    </Transition>
  </div>
</template>
