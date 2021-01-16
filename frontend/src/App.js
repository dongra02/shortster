import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'

import Header from './components/common/Header'
import Home from './components/common/Home'

class App extends React.Component {
  state = {
    userCodes: [],
    isAuthenticated: false
  }

  //On mount, check for token, if there, run request for codes
  //if no error on codes,setstate include isAuth to true
  //if error, clear token

  handleLogin = async () => {
    // fetch userCodes and include in setState
    this.setState({ isAuthenticated: true })
  }

  handleLogout = () => {
    this.setState({ userCodes: [], isAuthenticated: false })
  }

      
  render() {

    const { userCodes, isAuthenticated } = this.state

    return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header isAuthenticated={isAuthenticated} handleLogout={this.handleLogout}/>
          <Switch>
            <Route exact path="/" render={ () => <Home userCodes={userCodes} isAuthenticated={isAuthenticated} handleLogin={this.handleLogin}/> } />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
