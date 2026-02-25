<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="py-8">
    <h2 class="text-title font-semibold text-warm-800">
      Temas explorados
    </h2>
    <p class="mt-4 text-body text-warm-600">
      Próximamente: tu historial de temas y escrituras.
    </p>
  </div>
</template>
