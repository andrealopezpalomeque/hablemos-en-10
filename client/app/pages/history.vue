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

const categoryColors: Record<TopicCategory, { bg: string; text: string; border: string }> = {
  cultura:   { bg: '#fef3e2', text: '#b8621b', border: '#f4c67a' },
  educacion: { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' },
  economia:  { bg: '#fff3e0', text: '#e65100', border: '#ffcc80' },
  politica:  { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
  viajes:    { bg: '#f3e5f5', text: '#7b1fa2', border: '#ce93d8' },
  mundo:     { bg: '#e0f7fa', text: '#00695c', border: '#80cbc4' },
  vida:      { bg: '#fbe9e7', text: '#bf360c', border: '#ffab91' },
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
  })
}

onMounted(() => {
  loadCompletedTopics()
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header row -->
    <div class="flex items-start justify-between gap-4">
      <div>
        <h2 class="font-heading text-[28px] font-black text-warm-900">
          Mis Temas
        </h2>
        <p v-if="completedCount > 0" class="mt-1 text-base text-warm-700">
          {{ completedCount }} {{ completedCount === 1 ? 'ensayo escrito' : 'ensayos escritos' }} hasta ahora
        </p>
      </div>
      <UiButton variant="ghost" size="small" @click="navigateTo('/home')">
        Volver
      </UiButton>
    </div>

    <!-- Loading -->
    <div v-if="isLoadingHistory" class="flex flex-col items-center gap-4 py-8">
      <div class="size-12 animate-spin rounded-full border-4 border-warm-200 border-t-warm-500" />
      <p class="text-body text-warm-700">Cargando tus temas...</p>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="completedCount === 0"
      class="w-full rounded-3xl border border-warm-200 bg-white p-8 text-center"
    >
      <p class="text-title text-warm-700">
        Todavía no exploraste ningún tema.
      </p>
      <p class="mt-3 text-body text-warm-700">
        Cuando completes tu primera sesión de escritura, vas a verla acá.
      </p>
      <UiButton class="mt-8" variant="secondary" @click="navigateTo('/home')">
        Ir a escribir
      </UiButton>
    </div>

    <!-- Topic list -->
    <div v-else class="flex flex-col gap-3">
      <article
        v-for="topic in completedTopics"
        :key="topic.id"
        class="flex overflow-hidden rounded-[14px] border border-warm-200 bg-white transition-all duration-150 hover:-translate-y-px hover:shadow-md"
      >
        <!-- Left accent bar -->
        <div
          class="w-[5px] shrink-0"
          :style="{ background: categoryColors[topic.category]?.text }"
        />

        <!-- Content -->
        <div class="flex flex-1 flex-col gap-2 px-5 py-4">
          <div class="flex items-center justify-between gap-3">
            <span
              class="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide"
              :style="{
                background: categoryColors[topic.category]?.bg,
                color: categoryColors[topic.category]?.text,
                border: `1.5px solid ${categoryColors[topic.category]?.border}`,
              }"
            >
              {{ categoryLabels[topic.category] }}
            </span>
            <span class="whitespace-nowrap text-sm text-warm-400">
              {{ formatDate(topic.completedAt) }}
            </span>
          </div>
          <h3 class="font-heading text-body font-bold leading-snug text-warm-900">
            {{ topic.topic }}
          </h3>
        </div>
      </article>
    </div>

    <!-- Bottom CTA -->
    <div v-if="completedCount > 0" class="flex justify-center pt-3">
      <UiButton @click="navigateTo('/home')">
        Escribir un tema nuevo
      </UiButton>
    </div>
  </div>
</template>
