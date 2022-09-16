import { UseMiddleware } from 'next-api-decorators';
import { apiLogger } from 'middlewares/logger.middleware';
import queryParser from 'middlewares/queryParser.middleware';

@UseMiddleware(queryParser, apiLogger)
export default abstract class ApiHandler {}
