const userReducer = (state = null, action: any) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return action.payload
    case 'NOT_LOGGED_IN':
      return action.payload
    case 'LOG_OUT':
      return action.payload
    default:
      return state
  }
}

export default userReducer
