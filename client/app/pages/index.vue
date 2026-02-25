<script setup lang="ts">
import IconGoogle from '~icons/mdi/google'

definePageMeta({
  middleware: 'guest',
  layout: false,
})

const { login, error, isLoading } = useAuth()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-cream px-7 pb-safe-bottom pt-safe-top font-sans text-warm-900 md:px-10">
    <!-- Centered content -->
    <div class="flex flex-1 flex-col items-center justify-center text-center">
      <h1 class="font-heading text-display font-bold text-warm-800 md:text-[40px] md:leading-tight">
        Hablemos en <span class="text-warm-500">10'</span>
      </h1>
      <p class="mt-5 max-w-md text-title text-warm-700">
        Tu compañero de escritura te espera.
      </p>
      <p class="mt-3 max-w-md text-body text-warm-700">
        Elegí un tema, arrancá el reloj y escribí lo que pensás por 10'.
      </p>

      <UiButton class="mt-12" :loading="isLoading" @click="login">
        <IconGoogle class="size-7" aria-hidden="true" />
        Entrar con Google
      </UiButton>

      <p
        v-if="error"
        class="mt-6 max-w-md text-body text-red-600"
        role="alert"
      >
        {{ error }}
      </p>
    </div>

    <!-- Footer pinned to bottom -->
    <footer class="py-6 text-center text-base text-warm-700">
      Hecho con cariño para Leli
    </footer>
  </div>
</template>
