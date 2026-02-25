<script setup lang="ts">
const props = withDefaults(defineProps<{
  autoStart?: boolean
}>(), {
  autoStart: false,
})

const emit = defineEmits<{
  finish: []
}>()

const { display, isRunning, isFinished, progress, start, stop, reset } = useTimer(10)

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
    <!-- Timer display -->
    <div
      class="flex size-52 items-center justify-center rounded-full border-4 transition-colors"
      :class="[
        isFinished ? 'border-warm-400 bg-warm-100' : isRunning ? 'border-warm-500 bg-warm-50' : 'border-warm-300 bg-white',
      ]"
      role="timer"
      :aria-label="`Tiempo restante: ${display}`"
    >
      <span
        class="font-bold tabular-nums text-warm-800"
        :class="isFinished ? 'text-display' : 'text-timer'"
      >
        {{ isFinished ? '00:00' : display }}
      </span>
    </div>

    <!-- Progress bar -->
    <div class="h-2 w-full max-w-xs overflow-hidden rounded-full bg-warm-200" role="progressbar" :aria-valuenow="Math.round(progress * 100)" aria-valuemin="0" aria-valuemax="100">
      <div
        class="h-full rounded-full bg-warm-500 transition-all duration-1000 ease-linear"
        :style="{ width: `${progress * 100}%` }"
      />
    </div>

    <!-- Finished message -->
    <p v-if="isFinished" class="text-title font-semibold text-warm-800">
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
        variant="secondary"
        @click="stop"
      >
        Pausar
      </UiButton>

      <UiButton
        v-if="!isRunning && !isFinished && progress > 0"
        variant="primary"
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
