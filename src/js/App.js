import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import HomeView from './views/HomeView'

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/firstpage">
            <h1>First view</h1>
          </Route>
          <Route path="/secondpage">
            <h1>Second view</h1>
          </Route>
          <Route path="/">
            <HomeView />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
