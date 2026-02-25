<script setup lang="ts">
import IconGoogle from '~icons/mdi/google'

definePageMeta({
  middleware: 'guest',
})

const { login, error, isLoading } = useAuth()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <h2 class="text-display font-bold text-warm-800">
      Bienvenida
    </h2>
    <p class="mt-4 text-body text-warm-700">
      Tu compañera de escritura te espera.
    </p>
    <p class="mt-2 text-body text-warm-600">
      Elegí un tema, arrancá el reloj y escribí lo que pensás.
    </p>

    <button
      class="mt-10 flex items-center gap-3 rounded-2xl bg-warm-500 px-8 py-5 text-title font-semibold text-white shadow-md transition-colors hover:bg-warm-600 active:bg-warm-700 disabled:opacity-50"
      :disabled="isLoading"
      @click="login"
    >
      <IconGoogle class="size-7" />
      Entrar con Google
    </button>

    <p
      v-if="error"
      class="mt-6 text-body text-red-600"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>
