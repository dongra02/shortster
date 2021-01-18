import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/common/Header'
import Home from './components/common/Home'
import CodeStats from './components/code/CodeStats'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuthenticated(false)
  }


  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
        <Switch>
          <Route exact path="/" render={ () => <Home isAuthenticated={isAuthenticated} handleLogin={handleLogin}/> } />
          <Route path="/:shortUrl/stats" component={CodeStats} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
