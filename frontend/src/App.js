import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from './components/common/Header'
import Home from './components/common/Home'
import CodeStats from './components/code/CodeStats'

import { getUserCodes } from './lib/api'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/theme'

class App extends React.Component {
  state = {
    userCodes: [],
    isAuthenticated: false
  }

  componentDidMount = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const response = await getUserCodes()
        this.setState({ isAuthenticated: true, userCodes: response.data })
      } catch (err) {
        console.log(err)
      }
    }
  }

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
            <Route path="/:shortUrl/stats" component={CodeStats} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    )
  }
}

export default App
