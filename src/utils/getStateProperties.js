/**
 * Created by sunfengyan on 2017/11/28.
 */

import { isImmutable } from 'immutable'

const getStateProperties = (state) => {
  const foo = Object.create(null)

  state.mapKeys((key, value) => {
    if (isImmutable(value)) {
      foo[key] = value.toJS()
    } else {
      foo[key] = value
    }
  })

  return foo
}

export default getStateProperties
