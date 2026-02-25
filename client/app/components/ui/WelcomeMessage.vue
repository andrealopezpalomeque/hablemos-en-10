<script setup lang="ts">
const { user } = useAuth()

const greetings = [
  'Qué lindo que estés acá',
  'Hoy es un buen día para escribir',
  '¿Lista para escribir?',
  'Qué bueno verte por acá',
  'Dale, ¡a escribir!',
  'Te estábamos esperando',
]

const hour = new Date().getHours()
const timeGreeting = hour < 12 ? 'Buen día' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'

const firstName = computed(() => {
  const name = user.value?.displayName ?? ''
  return name.split(' ')[0] || ''
})

const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)]
</script>

<template>
  <div class="text-center">
    <p class="text-body font-medium uppercase tracking-wider text-warm-700">
      {{ timeGreeting }}<span v-if="firstName">, {{ firstName }}</span>
    </p>
    <h2 class="mt-3 font-heading text-display font-bold text-warm-900">
      {{ randomGreeting }}
    </h2>
  </div>
</template>
