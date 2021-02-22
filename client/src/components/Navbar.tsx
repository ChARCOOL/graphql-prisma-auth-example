import { Link as _Link } from 'react-router-dom'
import styled from 'styled-components'

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
  return (
    <Bar>
      <Link left="25px" to="/">
        Home
      </Link>
      <Link right="125px" to="/register">
        Register
      </Link>
      <Link right="25px" to="/login">
        Login
      </Link>
    </Bar>
  )
}

export default Navbar
