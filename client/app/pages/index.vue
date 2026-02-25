<script setup lang="ts">
import IconGoogle from '~icons/mdi/google'

definePageMeta({
  middleware: 'guest',
  layout: false,
})

const { login, error, isLoading } = useAuth()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
    <h1 class="text-display font-bold text-warm-800">
      Hablemos en 10
    </h1>
    <p class="mt-4 max-w-sm text-title text-warm-700">
      Tu compañera de escritura te espera.
    </p>
    <p class="mt-2 max-w-sm text-body text-warm-700">
      Elegí un tema, arrancá el reloj y escribí lo que pensás.
    </p>

    <UiButton class="mt-10" :loading="isLoading" @click="login">
      <IconGoogle class="size-7" aria-hidden="true" />
      Entrar con Google
    </UiButton>

    <p
      v-if="error"
      class="mt-6 text-body text-red-600"
      role="alert"
    >
      {{ error }}
    </p>

    <p class="mt-auto pb-6 text-sm text-warm-700">
      Hecho con cariño para vos, abuela
    </p>
  </div>
</template>
