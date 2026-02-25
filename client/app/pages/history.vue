<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <h2 class="text-display font-bold text-warm-800">
      Temas explorados
    </h2>

    <!-- Empty state -->
    <div class="mt-4 rounded-3xl border border-warm-200 bg-white p-8 text-center">
      <p class="text-title text-warm-600">
        Todavía no exploraste ningún tema.
      </p>
      <p class="mt-2 text-body text-warm-500">
        Cuando completes tu primera sesión de escritura, vas a verla acá.
      </p>
      <UiButton class="mt-6" variant="secondary" @click="navigateTo('/home')">
        Ir a escribir
      </UiButton>
    </div>
  </div>
</template>
