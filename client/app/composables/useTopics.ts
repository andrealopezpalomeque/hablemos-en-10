import { collection, addDoc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'
import type { CompletedTopic, Topic, TopicCategory } from '~/types'

export function useTopics() {
  const config = useRuntimeConfig()
  const currentTopic = ref<Topic | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const completedTopics = ref<CompletedTopic[]>([])
  const isLoadingHistory = ref(false)

  const completedCount = computed(() => completedTopics.value.length)
  const completedTopicNames = computed(() => completedTopics.value.map((t) => t.topic))

  async function getIdToken(): Promise<string> {
    const auth = getFirebaseAuth()
    const user = auth.currentUser
    if (!user) throw new Error('No hay sesión activa.')
    return user.getIdToken()
  }

  async function loadCompletedTopics() {
    isLoadingHistory.value = true
    try {
      const auth = getFirebaseAuth()
      const user = auth.currentUser
      if (!user) return

      const db = getFirebaseDb()
      const completedRef = collection(db, 'users', user.uid, 'completedTopics')
      const q = query(completedRef, orderBy('completedAt', 'desc'))
      const snapshot = await getDocs(q)

      completedTopics.value = snapshot.docs.map((doc) => {
        const data = doc.data()
        return {
          id: doc.id,
          topic: data.topic,
          keywords: data.keywords,
          questions: data.questions,
          category: data.category,
          completedAt: data.completedAt?.toDate() ?? new Date(),
          timerCompleted: data.timerCompleted ?? false,
        } as CompletedTopic
      })
    } catch (e) {
      console.error('Error loading completed topics:', e)
    } finally {
      isLoadingHistory.value = false
    }
  }

  async function fetchTopic(category?: TopicCategory) {
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
        body: JSON.stringify({
          category,
          completedTopics: completedTopicNames.value,
        }),
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

    // Add to local list so count updates immediately
    completedTopics.value.unshift({
      id: '',
      ...topic,
      completedAt: new Date(),
      timerCompleted,
    })
  }

  function clearTopic() {
    currentTopic.value = null
    error.value = null
  }

  return {
    currentTopic,
    isLoading,
    error,
    completedTopics,
    completedCount,
    isLoadingHistory,
    fetchTopic,
    saveCompletedTopic,
    loadCompletedTopics,
    clearTopic,
  }
}
