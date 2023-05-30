import { getServerSession } from '#auth'

export default eventHandler(async (event) => {
  if (getRequestURL(event).pathname.startsWith('/api/admin/')) {
    const session = await getServerSession(event)

    if (!session) {
      throw createError({ statusMessage: 'Unauthenticated', statusCode: 403 })
    }
  }
})