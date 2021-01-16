import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'

import Header from './components/common/Header'
import Home from './components/common/Home'

class App extends React.Component {
  state = {
    userCodes: null
  }

    
  render() {

    const { userCodes } = this.state

    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" render={ () => <Home userCodes={userCodes} /> } />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
