import { AccessTokenActionType } from '../action-types'

interface AccessTokenSetAction {
  type: AccessTokenActionType.SET
  payload: string
}

interface AccessTokenRemoveAction {
  type: AccessTokenActionType.REMOVE
  payload: null
}

export type AccessTokenAction = AccessTokenSetAction | AccessTokenRemoveAction
