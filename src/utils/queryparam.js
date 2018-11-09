import has from 'lodash/has'

export function compact(payload) {
  const queryParams = { ...payload }
  if (has(queryParams, 'field')) {
    queryParams[payload.field] = payload.keyword
    delete queryParams.field
    delete queryParams.keyword
  }
  if (has(queryParams, 'pageSize')) {
    queryParams.per_page = queryParams.pageSize  // eslint-disable-line
    delete queryParams.pageSize                  // eslint-disable-line
  }
  return queryParams
}
