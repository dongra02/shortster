import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/common/Header'
import Home from './components/common/Home'
import CodeStats from './components/code/CodeStats'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:shortUrl/stats" component={CodeStats} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
