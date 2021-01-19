import React from 'react'
import { Link } from 'react-router-dom'

import Form from '../../elements/Form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const CodeForm = ({ mode, formData, formErrors, handleSubmit, handleChange }) => {

  return (
    <Form>
      <Grid item xs={12}>
        <Typography align='center'>
          Short URLS must contain at least 4 alphanumeric characters only.
        </Typography>
        <Typography align='center'>
          Leave the field blank to let us do the work for you!
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <TextField
          id='short_url'
          label='Short URL'
          value={formData.short_url}
          onChange={handleChange}
          error={formErrors.short_url ? true : false}
          helperText={formErrors.short_url ? formErrors.short_url : ''}
          fullWidth />
      </Grid>
      <Grid item xs={8}>
        <TextField
          id='full_url'
          label='Paste Full URL'
          value={formData.full_url} 
          onChange={handleChange}
          error={formErrors.full_url ? true : false}
          helperText={formErrors.full_url ? formErrors.full_url : ''}
          fullWidth
          multiline
          rows={4} />
      </Grid>
      <Grid container item spacing={2} justify='center'>
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleSubmit}>{ mode === 'new' ? 'Save New Shortcode' : 'Update Shortcode' }</Button>
        </Grid>
        <Grid item>
          <Button variant='contained' color='secondary' component={Link} to={'/'}>Cancel</Button>
        </Grid>
      </Grid>
    </Form>      
  )
}

export default CodeForm