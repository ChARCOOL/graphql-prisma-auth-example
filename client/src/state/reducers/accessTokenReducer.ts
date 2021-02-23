import { AccessTokenActionType } from '../action-types'
import { AccessTokenAction } from '../actions'

type AccessTokenState = string | null

const reducer = (
  state: AccessTokenState = null,
  action: AccessTokenAction,
): AccessTokenState => {
  switch (action.type) {
    case AccessTokenActionType.SET:
      return action.payload
    case AccessTokenActionType.REMOVE:
      return null
    default:
      return state
  }
}

export default reducer
