import Cookies from 'js-cookie'

const checkRefreshToken = () => {
  const refreshToken = Cookies.get('refreshToken')

  if (!refreshToken) return false

  return refreshToken
}

export default checkRefreshToken
