/* eslint-disable camelcase */
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { register, login } from '../../lib/api'


class UserForm extends React.Component {

  state = {
    login: true,
    formData: {
      username: '',
      password: '',
      password_confirmation: ''
    },
    formErrors: {}
  }
  
  changeMode = () => {
    const formData = { username: '', password: '', password_confirmation: '' }
    this.setState({ login: !this.state.login, formData })
  }
  
  handleChange = (e) => {
    const formData = { ...this.state.formData, [e.target.id]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit = async () => {
    if (!this.state.login) {
      try {
        const response = await register(this.state.formData)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const response = await login(this.state.formData)
      localStorage.setItem('token', response.data.token)
      this.props.handleLogin()
    } catch (err) {
      console.log(err)
    }
  }

  render() {

    const { login } = this.state
    const { username, password, password_confirmation } = this.state.formData

    return (
      <form>
        <TextField id='username' label='username' value={username}  onChange={this.handleChange}/>
        <TextField id='password' label='password' type='password' value={password} onChange={this.handleChange}/>
        {!login && <TextField id='password_confirmation' type='password' label='confirm password' value={password_confirmation} onChange={this.handleChange}/>}
        <Button variant='outlined' onClick={this.handleSubmit}>{ login ? 'Login' : 'Register' }</Button>
        <Button variant='outlined' onClick={this.changeMode}>{ login ? 'I\'m a New User' : 'I Have An Account' }</Button>
      </form>
    )
  }
}

export default UserForm