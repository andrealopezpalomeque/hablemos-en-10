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

const categoryColors: Record<TopicCategory, { bg: string; text: string; border: string }> = {
  cultura:   { bg: '#fef3e2', text: '#b8621b', border: '#f4c67a' },
  educacion: { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' },
  economia:  { bg: '#fff3e0', text: '#e65100', border: '#ffcc80' },
  politica:  { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
  viajes:    { bg: '#f3e5f5', text: '#7b1fa2', border: '#ce93d8' },
  mundo:     { bg: '#e0f7fa', text: '#00695c', border: '#80cbc4' },
  vida:      { bg: '#fbe9e7', text: '#bf360c', border: '#ffab91' },
}
</script>

<template>
  <article class="w-full rounded-3xl border border-warm-200 bg-white p-7 shadow-sm md:p-9" aria-label="Tema de escritura">
    <!-- Category badge -->
    <span
      class="inline-block rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-wide"
      :style="{
        background: categoryColors[topic.category]?.bg,
        color: categoryColors[topic.category]?.text,
        border: `1.5px solid ${categoryColors[topic.category]?.border}`,
      }"
    >
      {{ categoryLabels[topic.category] }}
    </span>

    <!-- Topic title -->
    <h2 class="mt-5 font-heading text-[30px] font-black leading-tight text-warm-900">
      {{ topic.topic }}
    </h2>

    <!-- Divider -->
    <div class="mt-5 h-[3px] w-12 rounded-full bg-warm-500" />

    <!-- Keywords -->
    <div class="mt-5 flex flex-wrap gap-2.5" aria-label="Palabras clave">
      <span
        v-for="keyword in topic.keywords"
        :key="keyword"
        class="rounded-full border border-warm-200 bg-sand px-5 py-2 text-base font-semibold text-warm-700"
      >
        {{ keyword }}
      </span>
    </div>

    <!-- Guiding questions -->
    <div class="mt-7 flex flex-col gap-4">
      <div
        v-for="(question, index) in topic.questions"
        :key="index"
        class="flex items-start gap-3.5"
      >
        <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-warm-500 text-sm font-bold text-white">
          {{ index + 1 }}
        </span>
        <span class="font-heading text-body italic leading-relaxed text-warm-800">
          {{ question }}
        </span>
      </div>
    </div>
  </article>
</template>
