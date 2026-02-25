<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuth()

const firstName = computed(() => {
  const name = user.value?.displayName ?? ''
  return name.split(' ')[0] || ''
})
</script>

<template>
  <header class="flex items-center justify-between bg-warm-100 px-5 py-4 shadow-sm md:px-8">
    <NuxtLink
      to="/home"
      class="text-title font-bold tracking-tight text-warm-800"
      aria-label="Ir al inicio — Hablemos en 10"
    >
      Hablemos en 10
    </NuxtLink>

    <nav v-if="isLoggedIn" class="flex items-center gap-3" aria-label="Navegación principal">
      <NuxtLink
        to="/history"
        class="inline-flex min-h-[48px] items-center rounded-xl px-3 text-body font-medium text-warm-600 transition-colors hover:bg-warm-200 hover:text-warm-800"
      >
        Mis temas
      </NuxtLink>
      <img
        v-if="user?.photoURL"
        :src="user.photoURL"
        :alt="`Foto de ${firstName}`"
        class="size-10 rounded-full border-2 border-warm-300 object-cover"
        referrerpolicy="no-referrer"
      >
      <span class="hidden text-body font-medium text-warm-700 sm:inline">{{ firstName }}</span>
      <UiButton variant="ghost" size="small" aria-label="Cerrar sesión" @click="logout">
        Salir
      </UiButton>
    </nav>
  </header>
</template>
