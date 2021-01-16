import React from 'react'
import TextField from '@material-ui/core/TextField'


class UserForm extends React.Component {

  state = {
    login: true,
    formData: {
      username: '',
      password: '',
      passwordConfirm: ''
    }
  }
  
  handleChange = (e) => {
    const formData = { ...this.state.formData, [e.target.id]: e.target.value }
    this.setState({ formData })
  }

  render() {

    const { login } = this.state

    return (
      <form>
        <TextField id='username' label='username' onChange={this.handleChange}/>
        <TextField id='password' label='password' onChange={this.handleChange}/>
        {!login && <TextField id='passwordConfirm' label='confirm password' onChange={this.handleChange}/>}
      </form>
    )
  }
}

export default UserForm