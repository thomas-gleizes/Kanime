import { createMiddlewareDecorator } from 'next-api-decorators'
import { authMiddleware } from 'middlewares/auth.middleware'

export const AuthGuard = createMiddlewareDecorator(authMiddleware)
