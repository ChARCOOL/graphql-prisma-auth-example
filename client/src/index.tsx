import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers'

import './styles.css'
import 'react-toastify/dist/ReactToastify.css'

import App from './App'

const store = createStore(rootReducer, composeWithDevTools())

render(
  <Provider store={store}>
    <ToastContainer autoClose={1500} />
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
