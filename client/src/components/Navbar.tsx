import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request'

import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { ME } from '../utils/queries'

const Bar = styled.div`
  font-size: 20px;
  position: relative;
  background-color: #222222;
  align-items: center;
  width: 100%;
  height: 80px;
`

const Link_ = styled(Link)`
  transition: all ease-in 25ms;
  &:active {
    transform: scale(0.95) !important;
  }
  &:hover {
    transform: scale(1.05);
    color: #cccccc;
  }
  position: absolute;
  top: 27.5px;
  color: #f3f2e9;
`

const HomeLink = styled(Link_)`
  left: 25px;
`

const RegisterLink = styled(Link_)`
  right: 125px;
`

const LoginLink = styled(Link_)`
  right: 25px;
`

const LogoutLink = styled(Link_)`
  right: 25px;
`

const Navbar: React.FC = () => {
  const [userState, setUserState] = useState('LOGGED_OUT')

  console.log(userState)

  useEffect(() => {
    ;(async () => {
      const storage = localStorage.getItem('user')

      if (!storage) return setUserState('LOGGED_OUT')

      const user = JSON.parse(storage) as any

      const client = new GraphQLClient(process.env.REACT_APP_API_SERVER!, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      try {
        const { me } = await client.request(ME)

        if (me.email === user.email) return setUserState('LOGGED_IN')
      } catch (error) {
        return
      }
    })()
  }, [])

  return (
    <Bar>
      <HomeLink to="/">Home</HomeLink>
      {userState === 'LOGGED_IN' ? (
        <LogoutLink to="/logout">Logout</LogoutLink>
      ) : (
        <>
          <RegisterLink to="/register">Register</RegisterLink>
          <LoginLink to="/login">Login</LoginLink>
        </>
      )}
    </Bar>
  )
}

export default Navbar
