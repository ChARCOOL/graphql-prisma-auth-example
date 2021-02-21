import { render } from 'react-dom'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'

import './styles.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'

render(
  <>
    <ToastContainer autoClose={1500} />
    <Router>
      <App />
    </Router>
  </>,
  document.getElementById('root'),
)
