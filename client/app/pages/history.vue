<script setup lang="ts">
import type { TopicCategory } from '~/types'

definePageMeta({
  middleware: 'auth',
})

const { completedTopics, completedCount, isLoadingHistory, loadCompletedTopics } = useTopics()

const categoryLabels: Record<TopicCategory, string> = {
  educacion: 'Educación',
  economia: 'Economía',
  politica: 'Política',
  cultura: 'Cultura',
  viajes: 'Viajes',
  mundo: 'Mundo',
  vida: 'Vida',
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

onMounted(() => {
  loadCompletedTopics()
})
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <h2 class="text-display font-bold text-warm-800">
      Temas explorados
    </h2>

    <p v-if="completedCount > 0" class="text-title text-warm-600">
      Ya escribiste sobre {{ completedCount }} {{ completedCount === 1 ? 'tema' : 'temas' }}
    </p>

    <!-- Loading -->
    <div v-if="isLoadingHistory" class="flex flex-col items-center gap-4 py-8">
      <div class="size-12 animate-spin rounded-full border-4 border-warm-200 border-t-warm-500" />
      <p class="text-body text-warm-700">Cargando tus temas...</p>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="completedCount === 0"
      class="mt-4 w-full max-w-lg rounded-3xl border border-warm-200 bg-white p-8 text-center"
    >
      <p class="text-title text-warm-700">
        Todavía no exploraste ningún tema.
      </p>
      <p class="mt-2 text-body text-warm-700">
        Cuando completes tu primera sesión de escritura, vas a verla acá.
      </p>
      <UiButton class="mt-6" variant="secondary" @click="navigateTo('/home')">
        Ir a escribir
      </UiButton>
    </div>

    <!-- Topic list -->
    <div v-else class="flex w-full max-w-lg flex-col gap-4">
      <article
        v-for="topic in completedTopics"
        :key="topic.id"
        class="rounded-2xl border border-warm-200 bg-white p-5 shadow-sm"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0 flex-1">
            <h3 class="text-title font-semibold text-warm-800">
              {{ topic.topic }}
            </h3>
            <div class="mt-2 flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-warm-100 px-3 py-0.5 text-sm font-medium text-warm-700">
                {{ categoryLabels[topic.category] }}
              </span>
              <span class="text-sm text-warm-700">
                {{ formatDate(topic.completedAt) }}
              </span>
            </div>
          </div>
          <span
            v-if="topic.timerCompleted"
            class="shrink-0 text-sm text-warm-700"
            aria-label="Completó los 10 minutos"
            title="Completó los 10 minutos"
          >
            10 min
          </span>
        </div>

        <!-- Keywords -->
        <div class="mt-3 flex flex-wrap gap-1.5">
          <span
            v-for="keyword in topic.keywords"
            :key="keyword"
            class="rounded-full bg-sand px-3 py-1 text-sm text-warm-700"
          >
            {{ keyword }}
          </span>
        </div>
      </article>
    </div>
  </div>
</template>
