import { createParamDecorator } from 'next-api-decorators'

export const GetSession = createParamDecorator((req) => req.session)
