<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-cream text-gray-800">
    <LayoutHeader />
    <main class="mx-auto max-w-3xl px-4 py-6">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
