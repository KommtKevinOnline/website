import * as ackeeTracker from 'ackee-tracker'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  if (!runtimeConfig.public.ackeeHost) {
    console.error('No ackee host configured!')
  }

  if (!runtimeConfig.public.ackeeId) {
    console.error('No ackee id configured!')
  }

  const ackee = ackeeTracker.create(runtimeConfig.public.ackeeHost, {
    ignoreLocalhost: true,
    ignoreOwnVisits: false
  })

  ackee.record(runtimeConfig.public.ackeeId)

  console.log('[Analytics] Ackee initialized')
});