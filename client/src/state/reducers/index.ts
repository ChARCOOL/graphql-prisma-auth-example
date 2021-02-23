import { combineReducers } from 'redux'

import userReducer from './userReducer'
import accessTokenReducer from './accessTokenReducer'

const reducers = combineReducers({
  user: userReducer,
  accessToken: accessTokenReducer,
})

export type RootState = ReturnType<typeof reducers>

export default reducers
