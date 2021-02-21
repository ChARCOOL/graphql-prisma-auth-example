import { useEffect, useState } from 'react'
import { GraphQLClient } from 'graphql-request'

import { Link as _Link } from 'react-router-dom'
import styled from 'styled-components'

import { ME } from '../utils/queries'

interface IStyledProps {
  left?: string
  right?: string
}

const Bar = styled.div`
  font-size: 20px;
  position: relative;
  background-color: #222222;
  align-items: center;
  width: 100%;
  height: 80px;
`

const Link = styled(_Link)<IStyledProps>`
  transition: all ease-in 25ms;
  &:active {
    transform: scale(0.95) !important;
  }
  &:hover {
    transform: scale(1.05);
    color: #cccccc;
  }
  color: #f3f2e9;
  position: absolute;
  top: 27.5px;
  left: ${(props) => props.left && props.left};
  right: ${(props) => props.right && props.right};
`

const Navbar: React.FC = () => {
  const [userState, setUserState] = useState('LOGGED_OUT')

  useEffect(() => {
    const init = async () => {
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
    }

    init()
  }, [userState])

  return (
    <Bar>
      <Link left="25px" to="/">
        Home
      </Link>
      {userState === 'LOGGED_IN' ? (
        <Link right="25px" to="/logout">
          Logout
        </Link>
      ) : (
        <>
          <Link right="125px" to="/register">
            Register
          </Link>
          <Link right="25px" to="/login">
            Login
          </Link>
        </>
      )}
    </Bar>
  )
}

export default Navbar
