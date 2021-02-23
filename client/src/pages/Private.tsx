import { Link as _Link } from 'react-router-dom'
import styled from 'styled-components'

const Link = styled(_Link)`
  color: white;
  background-color: #222222;
  border: 2px solid #222222;
  padding: 0.5em 1em;
  margin-top: 50px;
  font-size: 24px;
  &:active {
    transform: scale(0.9);
    transition: all ease-in 25ms;
    box-shadow: inset 0 0 10px black;
  }
`

const Private: React.FC = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ width: '100%', position: 'absolute', top: '250px' }}>
        Only you can access this route!
      </h1>
      <div
        style={{
          display: 'table',
          margin: 'auto',
          marginTop: '250px',
          marginBottom: '250px',
        }}
      >
        <Link to="/">Go to the homepage!</Link>
      </div>
    </div>
  )
}

export default Private
