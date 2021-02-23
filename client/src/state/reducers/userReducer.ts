import { UserActionType } from '../action-types'
import { UserAction } from '../actions'

type UserState = { [key: string]: any } | null

const reducer = (state: UserState = null, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionType.LOGGED_IN:
      return action.payload
    case UserActionType.LOGGED_OUT:
      return null
    default:
      return state
  }
}

export default reducer
