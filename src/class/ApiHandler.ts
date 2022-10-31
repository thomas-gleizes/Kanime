import { Catch, UseMiddleware } from 'next-api-decorators'

import { apiLogger } from 'middlewares/logger.middleware'
import queryParser from 'middlewares/queryParser.middleware'
import exceptionHandler from 'middlewares/exceptionHandler.middleware'

@UseMiddleware(queryParser, apiLogger)
@Catch<Error>(exceptionHandler)
export default abstract class ApiHandler {}
