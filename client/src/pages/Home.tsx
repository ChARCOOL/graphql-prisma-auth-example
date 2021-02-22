import styled from 'styled-components'
import { Link as _Link } from 'react-router-dom'

const Link = styled(_Link)`
  color: white;
  background-color: #222222;
  border: 2px solid #222222;
  padding: 0.5em 1em;
  font-size: 24px;
  &:active {
    transform: scale(0.9);
    transition: all ease-in 25ms;
    box-shadow: inset 0 0 10px black;
  }
`

const Home: React.FC = () => {
  return (
    <div
      style={{
        display: 'table',
        margin: 'auto',
        marginTop: '250px',
        marginBottom: '250px',
      }}
    >
      <Link to="/protected">Go to protected route!</Link>
    </div>
  )
}

export default Home
