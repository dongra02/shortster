/* eslint-disable camelcase */
import React, { useState } from 'react'

import { register, login } from '../../lib/api'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  main: {
    border: '1px solid #43bce7',
    borderRadius: '5px',
    maxWidth: '40%',
    margin: '0 auto',
    padding: '1rem'
  }
}))


const UserForm = ({ handleLogin }) => {

  const classes = useStyles()
  
  const [loginMode, setMode] = useState(true)
  
  const initialFormData = { username: '', password: '', password_confirmation: '' }
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
      }
    }
    try {
      const response = await login(formData)
      localStorage.setItem('token', response.data.token)
      handleLogin()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Grid className={classes.main} container spacing={2} direction='column' justify='center' alignItems='center'>
      <Grid item>
        <TextField id='username' label='username' value={formData.username}  onChange={handleChange} fullWidth/>
      </Grid>
      <Grid item>
        <TextField id='password' label='password' type='password' value={formData.password} onChange={handleChange}/>
      </Grid>
      {!loginMode && 
      <Grid item>
        <TextField id='password_confirmation' type='password' label='confirm password' value={formData.password_confirmation} onChange={handleChange}/>
      </Grid>}
      <Grid item>
        <Button variant='outlined' onClick={handleSubmit}>{ loginMode ? 'Login' : 'Register' }</Button>
      </Grid>
      <Grid item>
        <Button variant='outlined' onClick={changeMode}>{ loginMode ? 'I\'m a New User' : 'I Have An Account' }</Button>
      </Grid>
    </Grid>
  )
}

export default UserForm