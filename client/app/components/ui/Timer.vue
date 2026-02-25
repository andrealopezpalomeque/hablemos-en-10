<script setup lang="ts">
const props = withDefaults(defineProps<{
  autoStart?: boolean
  topicName?: string
}>(), {
  autoStart: false,
  topicName: '',
})

const emit = defineEmits<{
  finish: []
}>()

const { display, secondsRemaining, isRunning, isFinished, progress, start, stop, reset } = useTimer(10)

const encouragement = computed(() => {
  if (secondsRemaining.value > 300) return 'Tomá tu tiempo, no hay apuro...'
  if (secondsRemaining.value > 60) return 'Vas muy bien, seguí escribiendo...'
  return 'Ya casi terminamos, últimas palabras...'
})

// Watch for timer completion to notify parent
watch(isFinished, (finished) => {
  if (finished) emit('finish')
})

// Auto-start if requested
onMounted(() => {
  if (props.autoStart) start()
})
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <!-- What you're writing about -->
    <div v-if="topicName" class="text-center">
      <p class="text-body font-medium text-warm-700">Estás escribiendo sobre</p>
      <p class="mt-1 font-heading text-title font-bold text-warm-800">{{ topicName }}</p>
    </div>

    <!-- Timer display -->
    <div
      role="timer"
      :aria-label="`Tiempo restante: ${display}`"
      class="my-2"
    >
      <span
        class="font-heading font-black tabular-nums tracking-wider"
        :class="[
          isFinished ? 'text-display text-warm-500' : 'text-timer text-warm-900',
          !isFinished && secondsRemaining <= 60 ? 'text-warm-500' : '',
        ]"
      >
        {{ isFinished ? '00:00' : display }}
      </span>
    </div>

    <!-- Progress bar -->
    <div class="h-2 w-full max-w-sm overflow-hidden rounded-full bg-warm-200" role="progressbar" :aria-valuenow="Math.round(progress * 100)" aria-valuemin="0" aria-valuemax="100">
      <div
        class="h-full rounded-full bg-gradient-to-r from-warm-500 to-warm-400 transition-all duration-1000 ease-linear"
        :style="{ width: `${progress * 100}%` }"
      />
    </div>

    <!-- Encouragement message while writing -->
    <p v-if="isRunning || (!isFinished && progress > 0)" class="max-w-xs text-center text-body italic text-warm-700">
      {{ encouragement }}
    </p>

    <!-- Finished message -->
    <p v-if="isFinished" class="font-heading text-title font-semibold text-warm-800">
      ¡Muy bien! ¿Terminaste?
    </p>

    <!-- Controls -->
    <div class="flex gap-4">
      <UiButton
        v-if="!isRunning && !isFinished && progress === 0"
        variant="primary"
        @click="start"
      >
        Arrancar el reloj
      </UiButton>

      <UiButton
        v-if="isRunning"
        variant="ghost"
        @click="stop"
      >
        Pausar
      </UiButton>

      <UiButton
        v-if="!isRunning && !isFinished && progress > 0"
        variant="ghost"
        @click="start"
      >
        Continuar
      </UiButton>

      <UiButton
        v-if="isFinished"
        variant="secondary"
        @click="reset"
      >
        Reiniciar
      </UiButton>
    </div>
  </div>
</template>
