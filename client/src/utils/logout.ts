import Cookies from 'js-cookie'

const logout = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}

export default logout
