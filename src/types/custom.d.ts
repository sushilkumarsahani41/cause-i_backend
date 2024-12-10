import { FastifyRequest } from 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: number
      role: string
      // Add other properties that you expect to be on `request.user`
    }
  }
}
