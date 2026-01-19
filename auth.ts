import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
 
export const config = {
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  },
  providers: [
    Credentials({
      name: "GemAccess",
      credentials: {
        password: { label: "Command Key", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials.password === process.env.ADMIN_PASSWORD) {
          // Return a user object on success
          return { id: "1", name: "Commander", email: "admin@suras.org" }
        }
        return null
      },
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname.startsWith("/api/services/control")) return !!auth
      return true
    },
  },
} satisfies NextAuthConfig
 
export const { handlers, auth, signIn, signOut } = NextAuth(config)
