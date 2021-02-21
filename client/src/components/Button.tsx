import styled from 'styled-components'

interface Props {
  primary?: boolean
}

const Button = styled.button<Props>`
  background-color: ${(props) => (props.primary ? '#222222' : 'white')};
  color: ${(props) => (props.primary ? 'white' : '#222222')};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid #222222;
  cursor: pointer;
  &:active {
    transform: scale(0.9);
    transition: all ease-in 25ms;
    box-shadow: inset 0 0 10px #000000;
  }
  &:disabled {
    cursor: not-allowed;
    border: 2px solid #646464;
    background-color: #646464;
  }
`

export default Button
