<script setup lang="ts">
const { user } = useAuth()

const greetings = [
  'Qué lindo que estés acá',
  'Hoy es un buen día para escribir',
  'Tu sabiduría merece ser contada',
  'Tus palabras importan',
  'El mundo necesita tu mirada',
  'Cada palabra tuya es un regalo',
  'Escribir es recordar y crear a la vez',
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
    <p class="text-title text-warm-600">
      {{ timeGreeting }}<span v-if="firstName">, {{ firstName }}</span>
    </p>
    <h2 class="mt-2 text-display font-bold text-warm-800">
      {{ randomGreeting }}
    </h2>
  </div>
</template>
