<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuth()

const firstName = computed(() => {
  const name = user.value?.displayName ?? ''
  return name.split(' ')[0] || ''
})
</script>

<template>
  <header class="flex items-center justify-between bg-warm-100 px-4 py-4 shadow-sm">
    <NuxtLink to="/home" class="text-title font-bold text-warm-800">
      Hablemos en 10
    </NuxtLink>

    <div v-if="isLoggedIn" class="flex items-center gap-4">
      <span class="text-body text-warm-700">{{ firstName }}</span>
      <button
        class="rounded-xl bg-warm-200 px-4 py-2 text-sm font-medium text-warm-800 transition-colors hover:bg-warm-300"
        @click="logout"
      >
        Salir
      </button>
    </div>
  </header>
</template>
