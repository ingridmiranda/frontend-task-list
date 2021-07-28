import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Details from './pages/Details'

import './styles.css'

import "react-datepicker/dist/react-datepicker.css";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path='/details/:id' exact={true} component={Details} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;