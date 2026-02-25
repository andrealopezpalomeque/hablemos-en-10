<script setup lang="ts">
import type { Topic, TopicCategory } from '~/types'

defineProps<{
  topic: Topic
}>()

const categoryLabels: Record<TopicCategory, string> = {
  educacion: 'Educación',
  economia: 'Economía',
  politica: 'Política',
  cultura: 'Cultura',
  viajes: 'Viajes',
  mundo: 'Mundo',
  vida: 'Vida',
}
</script>

<template>
  <article class="w-full rounded-3xl border border-warm-200 bg-white p-6 shadow-sm md:p-8" aria-label="Tema de escritura">
    <!-- Category badge -->
    <span class="inline-block rounded-full bg-warm-100 px-4 py-1 text-sm font-medium text-warm-700">
      {{ categoryLabels[topic.category] }}
    </span>

    <!-- Topic title -->
    <h2 class="mt-4 text-display font-bold text-warm-900">
      {{ topic.topic }}
    </h2>

    <!-- Keywords -->
    <div class="mt-5 flex flex-wrap gap-2" aria-label="Palabras clave">
      <span
        v-for="keyword in topic.keywords"
        :key="keyword"
        class="rounded-full bg-sand px-4 py-1.5 text-body font-medium text-warm-800"
      >
        {{ keyword }}
      </span>
    </div>

    <!-- Guiding questions -->
    <div class="mt-6">
      <h3 class="text-body font-semibold text-warm-700">
        Preguntas para guiarte:
      </h3>
      <ol class="mt-3 space-y-3">
        <li
          v-for="(question, index) in topic.questions"
          :key="index"
          class="flex items-start gap-3 text-body text-warm-800"
        >
          <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-warm-100 text-sm font-bold text-warm-600">
            {{ index + 1 }}
          </span>
          <span>{{ question }}</span>
        </li>
      </ol>
    </div>
  </article>
</template>
