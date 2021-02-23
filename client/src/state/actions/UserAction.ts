import { UserActionType } from '../action-types'

interface UserLoggedInAction {
  type: UserActionType.LOGGED_IN
  payload: { [key: string]: any }
}

interface UserLoggedOutAction {
  type: UserActionType.LOGGED_OUT
  payload: null
}

export type UserAction = UserLoggedInAction | UserLoggedOutAction
