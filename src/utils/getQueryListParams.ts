export function getQueryListParams(query: { limit?: string; skip?: string }): {
  limit?: number
  skip?: number
} {
  let { limit, skip }: any = query

  if (limit && !isNaN(+limit)) limit = +limit
  if (skip && !isNaN(+skip)) skip = +skip

  return { limit, skip }
}
