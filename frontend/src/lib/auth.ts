export const auth = betterAuth({
  database: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL!,
  },
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update every 24 hours
  },
  
  secret: process.env.BETTER_AUTH_SECRET!,
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user