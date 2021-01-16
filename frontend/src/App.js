import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'

import Header from './components/Header'
import Home from './components/Home'

class App extends React.Component {
  state = {
    user: null,
    userCodes: []
  }

  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
