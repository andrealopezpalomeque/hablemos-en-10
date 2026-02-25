import { defineStore } from 'pinia'
import type { UserProfile } from '~/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<UserProfile | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  function setUser(profile: UserProfile) {
    user.value = profile
  }

  function clearUser() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    setUser,
    clearUser,
  }
})
