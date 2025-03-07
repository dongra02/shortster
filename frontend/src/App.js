import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { isAuthenticated } from './lib/auth'

import Header from './components/common/Header'
import Home from './components/common/Home'
import Footer from './components/common/Footer'
import CodeStats from './components/code/CodeStats'
import CodeCreate from './components/code/CodeCreate'
import CodeEdit from './components/code/CodeEdit'
import CodeAccess from './components/code/CodeAccess'

import Wrapper from './elements/Wrapper'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'


const App = () => {

  const [loggedIn, setLoggedIn] = useState(isAuthenticated())

  const handleLogIn = () => {
    setLoggedIn(true)
  }

  const handleLogOut = () => {
    setLoggedIn(false)
    localStorage.removeItem('token')
    history.push('/')
  }

  const app = {
    handleLogIn,
    handleLogOut
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header app={app} loggedIn={loggedIn}/>
        <Wrapper>
          <Switch>
            <Route exact path="/" render={() => <Home app={app} loggedIn={loggedIn}/>}/>
            <Route exact path="/new" render={() => <CodeCreate loggedIn={loggedIn}/>}/>
            <Route path="/:shortUrl/stats" component={CodeStats} />
            <Route path="/:shortUrl/edit" render={() => <CodeEdit loggedIn={loggedIn}/>}/>
            <Route path="/:shortUrl" component={CodeAccess} />
          </Switch>
        </Wrapper>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
