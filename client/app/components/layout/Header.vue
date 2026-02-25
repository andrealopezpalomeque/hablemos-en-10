<script setup lang="ts">
const { user, isLoggedIn, logout } = useAuth()

const firstName = computed(() => {
  const name = user.value?.displayName ?? ''
  return name.split(' ')[0] || ''
})
</script>

<template>
  <header class="border-b border-warm-200 px-7 py-5 md:px-10">
    <div class="mx-auto flex max-w-2xl items-center justify-between">
      <NuxtLink
        to="/home"
        class="font-heading text-[22px] font-bold tracking-tight text-warm-800"
        aria-label="Ir al inicio — Hablemos en 10'"
      >
        Hablemos en <span class="text-warm-500">10'</span>
      </NuxtLink>

      <nav v-if="isLoggedIn" class="flex items-center gap-4" aria-label="Navegación principal">
        <NuxtLink
          to="/history"
          class="inline-flex min-h-[48px] items-center rounded-xl px-4 text-body font-medium text-warm-700 transition-colors hover:bg-warm-100 hover:text-warm-800"
        >
          Mis temas
        </NuxtLink>
        <div class="flex items-center gap-2.5 rounded-full bg-warm-100 py-2 pl-2 pr-4">
          <img
            v-if="user?.photoURL"
            :src="user.photoURL"
            :alt="`Foto de ${firstName}`"
            class="size-8 rounded-full object-cover"
            referrerpolicy="no-referrer"
          >
          <div v-else class="flex size-8 items-center justify-center rounded-full bg-warm-500 text-sm font-bold text-white">
            {{ firstName.charAt(0) }}
          </div>
          <span class="text-sm font-semibold text-warm-700">{{ firstName }}</span>
        </div>
        <UiButton variant="ghost" size="small" aria-label="Cerrar sesión" @click="logout">
          Salir
        </UiButton>
      </nav>
    </div>
  </header>
</template>
