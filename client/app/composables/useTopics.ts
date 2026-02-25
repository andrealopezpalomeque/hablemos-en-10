import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import type { Topic, TopicCategory } from '~/types'

export function useTopics() {
  const config = useRuntimeConfig()
  const currentTopic = ref<Topic | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  async function getIdToken(): Promise<string> {
    const auth = getFirebaseAuth()
    const user = auth.currentUser
    if (!user) throw new Error('No hay sesión activa.')
    return user.getIdToken()
  }

  async function fetchTopic(category?: TopicCategory, completedTopics?: string[]) {
    isLoading.value = true
    error.value = null
    currentTopic.value = null

    try {
      const token = await getIdToken()

      const response = await fetch(`${config.public.apiBaseUrl}/api/topics/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ category, completedTopics }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || 'Error al generar el tema.')
      }

      const topic: Topic = await response.json()
      currentTopic.value = topic
    } catch (e: any) {
      error.value = e.message || 'Hubo un problema. Intentá de nuevo.'
      console.error('Error fetching topic:', e)
    } finally {
      isLoading.value = false
    }
  }

  async function saveCompletedTopic(topic: Topic, timerCompleted: boolean) {
    try {
      const auth = getFirebaseAuth()
      const user = auth.currentUser
      if (!user) throw new Error('No hay sesión activa.')

      const db = getFirebaseDb()
      const completedRef = collection(db, 'users', user.uid, 'completedTopics')

      await addDoc(completedRef, {
        topic: topic.topic,
        keywords: topic.keywords,
        questions: topic.questions,
        category: topic.category,
        completedAt: serverTimestamp(),
        timerCompleted,
      })
    } catch (e: any) {
      console.error('Error saving topic:', e)
      throw e
    }
  }

  function clearTopic() {
    currentTopic.value = null
    error.value = null
  }

  return {
    currentTopic,
    isLoading,
    error,
    fetchTopic,
    saveCompletedTopic,
    clearTopic,
  }
}
