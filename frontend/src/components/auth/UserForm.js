import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


class UserForm extends React.Component {

  state = {
    login: true,
    formData: {
      username: '',
      password: '',
      passwordConfirm: ''
    }
  }
  
  changeMode = () => {
    const formData = { username: '', password: '', passwordConfirmation: '' }
    this.setState({ login: !this.state.login, formData })
  }
  
  handleChange = (e) => {
    const formData = { ...this.state.formData, [e.target.id]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit = () => {
    // use try catch for api of course
    if (this.state.login) {
      console.log('logging in with... ', this.state.formData)
    }
    if (!this.state.login) {
      console.log('registering with... ', this.state.formData)
    }
  }

  render() {

    const { login } = this.state
    const { username, password, passwordConfirm } = this.state.formData

    return (
      <form>
        <TextField id='username' label='username' value={username}  onChange={this.handleChange}/>
        <TextField id='password' label='password' value={password} onChange={this.handleChange}/>
        {!login && <TextField id='passwordConfirm' label='confirm password' value={passwordConfirm} onChange={this.handleChange}/>}
        <Button variant='outlined' onClick={this.handleSubmit}>{ login ? 'Login' : 'Register' }</Button>
        <Button variant='outlined' onClick={this.changeMode}>{ login ? 'I\'m a New User' : 'I Have An Account' }</Button>
      </form>
    )
  }
}

export default UserForm