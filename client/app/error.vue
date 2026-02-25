<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode?: number
    message?: string
  }
}>()

function handleClear() {
  clearError({ redirect: '/home' })
}
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
    <h1 class="text-display font-bold text-warm-800">
      Algo salió mal
    </h1>
    <p class="mt-4 max-w-sm text-title text-warm-700">
      No te preocupes, estas cosas pasan. Intentemos de nuevo.
    </p>
    <p v-if="props.error.statusCode === 404" class="mt-2 text-body text-warm-700">
      La página que buscás no existe.
    </p>

    <UiButton class="mt-8" @click="handleClear">
      Volver al inicio
    </UiButton>

    <p class="mt-auto pb-6 text-sm text-warm-700">
      Hecho con cariño para vos, abuela
    </p>
  </div>
</template>
