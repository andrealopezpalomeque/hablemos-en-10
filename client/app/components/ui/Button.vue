<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'small'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'default',
  disabled: false,
  loading: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center gap-3 rounded-2xl font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-warm-300 disabled:opacity-50 disabled:cursor-not-allowed'

  const sizes: Record<string, string> = {
    default: 'min-h-[56px] px-10 py-4 text-title',
    small: 'min-h-[48px] px-6 py-3 text-body',
  }

  const variants: Record<string, string> = {
    primary: 'bg-warm-500 text-white shadow-lg shadow-warm-500/30 hover:bg-warm-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-warm-500/40 active:translate-y-0 active:shadow-md',
    secondary: 'border-2 border-warm-300 bg-transparent text-warm-700 hover:border-warm-500 hover:text-warm-500 hover:bg-warm-50',
    ghost: 'bg-warm-200 text-warm-700 hover:bg-warm-300',
  }

  return [base, sizes[props.size], variants[props.variant]].join(' ')
})

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="classes"
    :disabled="disabled || loading"
    :aria-busy="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="size-6 animate-spin rounded-full border-3 border-current border-t-transparent" aria-hidden="true" />
    <slot />
  </button>
</template>
