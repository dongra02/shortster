import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/common/Header'
import Home from './components/common/Home'
import CodeStats from './components/code/CodeStats'
import CodeCreate from './components/code/CodeCreate'
import CodeEdit from './components/code/CodeEdit'
import CodeAccess from './components/code/CodeAccess'

import Wrapper from './elements/Wrapper'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'


const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new" component={CodeCreate} />
            <Route path="/:shortUrl/stats" component={CodeStats} />
            <Route path="/:shortUrl/edit" component={CodeEdit} />
            <Route path="/:shortUrl" component={CodeAccess} />
          </Switch>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
