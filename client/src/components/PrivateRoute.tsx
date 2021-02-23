import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { AccessTokenActionType } from '../state/action-types'
import { AccessTokenAction } from '../state/actions'
import checkRefreshToken from '../utils/checkRefreshToken'
import renewAccessToken from '../utils/renewAccessToken'

interface PrivateRouteProps extends RouteProps {
  component: any
  isSignedIn: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isSignedIn,
  ...rest
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const refreshToken = checkRefreshToken()

    if (refreshToken) {
      const renewToken = async () => {
        dispatch<AccessTokenAction>({
          type: AccessTokenActionType.SET,
          payload: await renewAccessToken(refreshToken),
        })
      }

      renewToken()
    }
  }, [dispatch])

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isSignedIn ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
