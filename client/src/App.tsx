import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GraphQLClient } from 'graphql-request'
import { Switch, Route } from 'react-router-dom'

import { ME } from './utils/queries'
import { RootState } from './state'
import { AccessTokenAction, UserAction } from './state/actions'
import { AccessTokenActionType, UserActionType } from './state/action-types'

import Private from './pages/Private'
import renewAccessToken from './utils/renewAccessToken'
import checkRefreshToken from './utils/checkRefreshToken'

import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'

const App: React.FC = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((user: RootState) => user)

  useEffect(() => {
    const getUser = async () => {
      const refreshToken = checkRefreshToken()

      if (!refreshToken) return

      const accessToken = await renewAccessToken(refreshToken)

      const client = new GraphQLClient(process.env.REACT_APP_API_SERVER!, {
        headers: {
          Authorization: accessToken,
        },
      })

      const { me } = await client.request(ME)

      dispatch<UserAction>({
        type: UserActionType.LOGGED_IN,
        payload: { username: me.username, email: me.email },
      })

      dispatch<AccessTokenAction>({
        type: AccessTokenActionType.SET,
        payload: accessToken,
      })
    }

    getUser()
  }, [dispatch])

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute
          exact
          path="/private"
          component={Private}
          isSignedIn={Boolean(user)}
        />
      </Switch>
    </>
  )
}

export default App
