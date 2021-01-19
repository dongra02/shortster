/* eslint-disable camelcase */
import React, { useState } from 'react'

import Form from '../../elements/Form'

import { register, login } from '../../lib/api'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const initialFormData = { username: '', password: '', password_confirmation: '' }

const LoginForm = ({ handleLogin }) => {
  
  const [loginMode, setMode] = useState(true)
  
  const [formData, setFormData] = useState(initialFormData)
  
  // const [formErrors, setFormErrors] = React.useState({})

  const changeMode = () =>{
    setMode(!loginMode)
    setFormData(initialFormData)
  }

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    setFormData(newFormData)
  }
  
  const handleSubmit = async () => {
    if (!loginMode) {
      try {
        const response = await register(formData)
        console.log(response)
      } catch (err) {
        console.log(err)
        // setFormErrors(err.response.data)
      }
    }
    try {
      const response = await login(formData)
      localStorage.setItem('token', response.data.token)
      handleLogin()
    } catch (err) {
      console.log(err)
      // setFormErrors(err.response.data)
    }
  }

  return (
    <Form>
      <Grid item xs={8}>
        <TextField id='username' label='username' value={formData.username}  onChange={handleChange} fullWidth/>
      </Grid>
      <Grid item xs={8}>
        <TextField id='password' label='password' type='password' value={formData.password} onChange={handleChange} fullWidth/>
      </Grid>
      {!loginMode && 
      <Grid item xs={8}>
        <TextField id='password_confirmation' type='password' label='confirm password' value={formData.password_confirmation} onChange={handleChange} fullWidth/>
      </Grid>}
      <Grid item xs={8}>
        <Button variant='outlined' onClick={handleSubmit}>{ loginMode ? 'Login' : 'Register' }</Button>
      </Grid>
      <Grid item xs={8}>
        <Button variant='outlined' onClick={changeMode}>{ loginMode ? 'I\'m a New User' : 'I Have An Account' }</Button>
      </Grid>
    </Form>
  )
}

export default LoginForm