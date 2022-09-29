import { createMiddlewareDecorator } from 'next-api-decorators';
import { authAdminMiddleware } from 'middlewares/auth.middleware';

export const AdminGuard = createMiddlewareDecorator(authAdminMiddleware);
