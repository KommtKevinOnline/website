import { NuxtAuthHandler } from '#auth'
import TwitchProvider from 'next-auth/providers/twitch'
export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    TwitchProvider.default({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
    })
  ],
  callbacks: {
    signIn(params) {
      const availableMails = (process.env.LOGIN_MAILS)?.split(',')

      if (!params.user.email) return false

      return !!availableMails?.includes(params.user.email)
    },
  }
})