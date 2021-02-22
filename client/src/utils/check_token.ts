import Cookies from 'js-cookie'

const check_token = (token: 'refreshToken' | 'accessToken') => {
  if (!Cookies.get(token)) return false

  return true
}

export default check_token
