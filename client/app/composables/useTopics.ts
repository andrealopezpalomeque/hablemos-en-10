import type { Topic } from '~/types'

// Placeholder — will be implemented in Phase 5 (Connect Frontend to Backend)
export function useTopics() {
  const currentTopic = ref<Topic | null>(null)
  const isLoading = ref(false)

  return {
    currentTopic,
    isLoading,
  }
}
