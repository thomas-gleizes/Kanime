import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData
} from 'next'
import type { ParsedUrlQuery } from 'querystring'
import { createHandler } from 'next-api-decorators'

import { Exception, SsrException } from 'exceptions'
import { ssrLogger } from 'middlewares/logger.middleware'
import { withSessionApi, withSessionSsr } from 'services/session.service'
import { errorMessage } from 'resources/constants'
import trace from 'utils/trace'

export const apiHandler = (handler: any) => withSessionApi(createHandler(handler))

export function ssrHandler<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  handler: (
    context: GetServerSidePropsContext<Q>
  ) => OptionalPromise<GetServerSidePropsResult<P>>
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
              message: error.message
            }
          }
        }
      }

      return {
        props: {
          error: {
            statusCode: 500,
            message: errorMessage.INTERNAL_ERROR
          }
        }
      }
    }
  })
}
