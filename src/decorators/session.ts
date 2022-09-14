import { createParamDecorator } from 'next-api-decorators';

export const Session = createParamDecorator((req) => {
  return req.session;
});
