<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

type ViewState = 'welcome' | 'loading' | 'topic' | 'writing' | 'finished' | 'saved'
const viewState = ref<ViewState>('welcome')

const { currentTopic, isLoading, error, fetchTopic, saveCompletedTopic, clearTopic } = useTopics()
const timerCompleted = ref(false)
const isSaving = ref(false)

async function handleRequestTopic() {
  viewState.value = 'loading'
  await fetchTopic()
  if (currentTopic.value) {
    viewState.value = 'topic'
  } else {
    viewState.value = 'welcome'
  }
}

async function handleAnotherTopic() {
  viewState.value = 'loading'
  await fetchTopic()
  if (currentTopic.value) {
    viewState.value = 'topic'
  } else {
    viewState.value = 'welcome'
  }
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
    viewState.value = 'saved'
  } catch {
    // Firestore save failed — still show saved state so she isn't stuck
    viewState.value = 'saved'
  } finally {
    isSaving.value = false
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

      <!-- Show error with retry -->
      <p v-if="error" class="max-w-md text-center text-body text-red-600">
        {{ error }}
      </p>

      <UiButton class="mt-4" @click="handleRequestTopic">
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

    <!-- Saved confirmation -->
    <template v-else-if="viewState === 'saved'">
      <div class="flex flex-col items-center gap-6 py-8">
        <p class="text-display font-semibold text-warm-700">
          ¡Guardado!
        </p>
        <p class="max-w-md text-center text-title text-warm-600">
          Otro tema más para tu libro. ¡Seguí así!
        </p>

        <UiButton class="mt-4" @click="backToStart">
          Seguir escribiendo
        </UiButton>
      </div>
    </template>
  </div>
</template>
