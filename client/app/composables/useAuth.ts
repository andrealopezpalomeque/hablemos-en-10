import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import type { UserProfile } from '~/types'

const isLoading = ref(true)
const error = ref<string | null>(null)

let _authReadyResolve: (() => void) | null = null
const _authReady = new Promise<void>((resolve) => {
  _authReadyResolve = resolve
})
let _listenerInitialized = false

export function useAuth() {
  const userStore = useUserStore()

  const user = computed(() => userStore.user)
  const isLoggedIn = computed(() => userStore.isAuthenticated)

  function initAuthListener() {
    if (_listenerInitialized) return
    _listenerInitialized = true

    const auth = getFirebaseAuth()

    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const profile: UserProfile = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName ?? '',
          email: firebaseUser.email ?? '',
          photoURL: firebaseUser.photoURL ?? '',
          createdAt: new Date(),
          lastLogin: new Date(),
        }
        userStore.setUser(profile)
      } else {
        userStore.clearUser()
      }

      isLoading.value = false
      if (_authReadyResolve) {
        _authReadyResolve()
        _authReadyResolve = null
      }
    })
  }

  async function login() {
    error.value = null
    const auth = getFirebaseAuth()
    const provider = new GoogleAuthProvider()

    try {
      await signInWithPopup(auth, provider)
    } catch (e: any) {
      // Popup blocked (common on iPad Safari) — fall back to redirect
      if (
        e.code === 'auth/popup-blocked' ||
        e.code === 'auth/popup-closed-by-user'
      ) {
        try {
          await signInWithRedirect(auth, provider)
        } catch (redirectError: any) {
          error.value = 'No se pudo iniciar sesión. Intentá de nuevo.'
          console.error('Redirect auth error:', redirectError)
        }
        return
      }
      error.value = 'No se pudo iniciar sesión. Intentá de nuevo.'
      console.error('Auth error:', e)
    }
  }

  async function logout() {
    const auth = getFirebaseAuth()
    await signOut(auth)
    userStore.clearUser()
    await navigateTo('/')
  }

  function waitForAuth(): Promise<void> {
    return _authReady
  }

  return {
    user,
    isLoggedIn,
    isLoading,
    error,
    login,
    logout,
    initAuthListener,
    waitForAuth,
  }
}
