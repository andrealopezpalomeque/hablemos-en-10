export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const { waitForAuth, isLoggedIn } = useAuth()
  await waitForAuth()

  if (!isLoggedIn.value) {
    return navigateTo('/')
  }
})
