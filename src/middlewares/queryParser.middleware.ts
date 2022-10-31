import { NextFunction } from 'next-api-decorators'

import { ApiRequest, ApiResponse } from 'app/next'

export default function queryParser(
  req: ApiRequest,
  res: ApiResponse,
  next: NextFunction
): void {
  for (const [key, value] of Object.entries(req.query)) {
    if (key.match(/\[\]$/)) {
      req.query[key.replace(/\[\]$/, '')] = value
      delete req.query[key]
    }
  }

  for (const [key, value] of Object.entries(req.query)) {
    try {
      req.query[key] = JSON.parse(value as string)
    } catch (e) {}
  }

  next()
}
