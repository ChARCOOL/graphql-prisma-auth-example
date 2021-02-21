import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  )
}

export default App
