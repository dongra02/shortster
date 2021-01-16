import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/common/Header'
import Home from './components/common/Home'

import { getUserCodes } from './lib/api'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'

class App extends React.Component {
  state = {
    userCodes: [],
    isAuthenticated: false
  }

  //On mount, check for token, if there, run request for codes
  //if no error on codes,setstate include isAuth to true
  //if error, clear token

  handleLogin = async () => {
    try {
      const response = await getUserCodes()
      this.setState({ isAuthenticated: true, userCodes: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  handleLogout = () => {
    localStorage.removeItem('token')
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
