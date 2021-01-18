import React from 'react'

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

const CodeForm = ({ mode, formData, handleSubmit, handleChange }) => {

  const classes = useStyles()

  return (
    <Grid className={classes.main} container spacing={2} direction='column' justify='center' alignItems='center'>
      <Grid item>
        <TextField id='full_url' label='Full URL' value={formData.full_url}  onChange={handleChange} fullWidth/>
      </Grid>
      <Grid item>
        <TextField id='short_url' label='Short URL - optional' value={formData.short_url}  onChange={handleChange} fullWidth/>
      </Grid>
      <Grid item>
        <Button variant='outlined' onClick={handleSubmit}>{ mode === 'new' ? 'Save New Shortcode' : 'Update Shortcode' }</Button>
      </Grid>
    </Grid>
  )
}

export default CodeForm