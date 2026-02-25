<script setup lang="ts">
</script>

<template>
  <div class="flex min-h-screen flex-col bg-cream font-sans text-warm-900">
    <LayoutHeader />
    <main class="mx-auto w-full max-w-2xl flex-1 px-5 py-8 md:px-8 md:py-10">
      <slot />
    </main>
    <LayoutFooter />
  </div>
</template>
