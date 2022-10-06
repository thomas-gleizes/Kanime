import { Body, Get, HttpCode, Post } from 'next-api-decorators';

import ApiHandler from 'class/ApiHandler';
import { apiHandler } from 'services/handler.service';
import HttpStatus from 'resources/HttpStatus';

export class TestApiHandler extends ApiHandler {
  @Get()
  show() {
    return { name: 'John Doe' };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: any) {
    return { name: body.name };
  }
}

export default apiHandler(TestApiHandler);
