/* eslint-disable camelcase */
import React, { useState } from 'react'

import Form from '../../elements/Form'

import { register, login } from '../../lib/api'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const initialFormData = { username: '', password: '', password_confirmation: '' }

const LoginForm = ({ app, handleAuth }) => {
  
  const [loginMode, setMode] = useState(true)
  
  const [formData, setFormData] = useState(initialFormData)
  const [formErrors, setFormErrors] = useState({})

  const changeMode = () =>{
    setMode(!loginMode)
    setFormData(initialFormData)
  }

  const handleChange = (e) => {
    const newFormData = { ...formData, [e.target.id]: e.target.value }
    const newFormErrors = { ...formErrors, [e.target.id]: '' }
    setFormData(newFormData)
    setFormErrors(newFormErrors)
  }
  
  const handleSubmit = async () => {
    if (!loginMode) {
      try {
        let response = await register(formData)
        response = await login(formData)
        localStorage.setItem('token', response.data.token)
        app.handleLogIn()
        handleAuth()
      } catch (err) {
        setFormErrors(err.response.data)
      }
    }
    if (loginMode) {
      try {
        const response = await login(formData)
        localStorage.setItem('token', response.data.token)
        app.handleLogIn()
        handleAuth()
      } catch (err) {
        setFormErrors(err.response.data)
      }
    }
  }

  return (
    <Form>
      <Grid item xs={8}>
        <TextField
          id='username'
          label='username'
          value={formData.username}
          onChange={handleChange} 
          error={formErrors.username ? true : false}
          helperText={formErrors.username ? formErrors.username : ''}
          fullWidth/>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id='password'
          label='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password ? true : false}
          helperText={formErrors.password ? formErrors.password : ''}
          fullWidth/>
      </Grid>
      {!loginMode && 
      <Grid item xs={8}>
        <TextField
          id='password_confirmation'
          label='confirm password'
          type='password'
          value={formData.password_confirmation}
          onChange={handleChange}
          error={formErrors.password_confirmation ? true : false}
          helperText={formErrors.password_confirmation ? formErrors.password_confirmation : ''}
          fullWidth/>
      </Grid>}
      <Grid container item xs={8} justify='center'>
        <Button variant='contained' color='primary' onClick={handleSubmit}>{ loginMode ? 'Login' : 'Register' }</Button>
      </Grid>
      <Grid container item xs={8} justify='center'>
        <Button size='small' color='primary' onClick={changeMode}>{ loginMode ? 'I\'m a New User' : 'I Have An Account' }</Button>
      </Grid>
    </Form>
  )
}

export default LoginForm