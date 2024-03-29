import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
  PreviewData
} from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { createHandler } from 'next-api-decorators'

import { Exception, SsrException } from 'exceptions'
import ApiHandler from 'class/ApiHandler'
import { ssrLogger } from 'middlewares/logger.middleware'
import { withSessionApi, withSessionSsr } from 'services/session.service'
import { errorMessage } from 'resources/constants'
import httpStatus from 'resources/HttpStatus'
import trace from 'utils/trace'

export const handleApi = <Handler extends ApiHandler>(handler: Handler): NextApiHandler =>
  withSessionApi(createHandler(handler as any))

export function ssrHandler<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  handler: (context: GetServerSidePropsContext<Q>) => OptionalPromise<GetServerSidePropsResult<P>>
): GetServerSideProps<P, Q, D> {
  // @ts-ignore
  return withSessionSsr<P, Q, D>(async (context) => {
    try {
      ssrLogger(context)

      return await handler(context)
    } catch (error) {
      if (error instanceof SsrException) {
        trace('SsrError', error.stack)

        return {
          props: {
            error: error.parse()
          }
        }
      }

      if (
        process.env.NODE_ENV !== 'production' &&
        (error instanceof Error || error instanceof Exception)
      ) {
        return {
          props: {
            error: {
              name: 'SsrException',
              message: error.message,
              statusCode: httpStatus.INTERNAL_SERVER_ERROR
            }
          }
        }
      }

      return {
        props: {
          error: {
            name: 'SsrException',
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: errorMessage.INTERNAL_ERROR
          }
        }
      }
    }
  })
}
