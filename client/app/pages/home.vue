<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user } = useAuth()

const greetings = [
  'Qué lindo que estés acá',
  'Hoy es un buen día para escribir',
  'Tu sabiduría merece ser contada',
  'Tus palabras importan',
  'El mundo necesita tu mirada',
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
  <div class="flex flex-col items-center gap-8 py-8 text-center">
    <p class="text-body text-warm-600">
      {{ timeGreeting }}, {{ firstName }}
    </p>
    <h2 class="text-display font-bold text-warm-800">
      {{ randomGreeting }}
    </h2>
    <p class="mt-4 text-body text-warm-600">
      Próximamente: tu tema del día y el reloj de 10 minutos.
    </p>
  </div>
</template>
