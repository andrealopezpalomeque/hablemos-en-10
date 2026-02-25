export function useTimer(durationMinutes: number = 10) {
  const totalSeconds = durationMinutes * 60
  const secondsRemaining = ref(totalSeconds)
  const isRunning = ref(false)
  const isFinished = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const minutes = computed(() => Math.floor(secondsRemaining.value / 60))
  const seconds = computed(() => secondsRemaining.value % 60)
  const display = computed(() => {
    const m = String(minutes.value).padStart(2, '0')
    const s = String(seconds.value).padStart(2, '0')
    return `${m}:${s}`
  })
  const progress = computed(() => 1 - secondsRemaining.value / totalSeconds)

  function start() {
    if (isRunning.value || isFinished.value) return
    isRunning.value = true
    intervalId = setInterval(() => {
      secondsRemaining.value--
      if (secondsRemaining.value <= 0) {
        stop()
        isFinished.value = true
      }
    }, 1000)
  }

  function stop() {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function reset() {
    stop()
    secondsRemaining.value = totalSeconds
    isFinished.value = false
  }

  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
  })

  return {
    secondsRemaining,
    isRunning,
    isFinished,
    minutes,
    seconds,
    display,
    progress,
    start,
    stop,
    reset,
  }
}
