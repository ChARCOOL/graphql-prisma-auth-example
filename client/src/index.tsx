import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'

import { store } from './state'

import './styles.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'

render(
  <Provider store={store}>
    <ToastContainer autoClose={1500} />
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
