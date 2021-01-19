import React from 'react'

import Form from '../../elements/Form'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const CodeForm = ({ mode, formData, handleSubmit, handleChange }) => {

  return (
    <Form>
      <Grid item xs={8}>
        <TextField
          multiline id='full_url'
          label='Full URL'
          value={formData.full_url} 
          onChange={handleChange}
          fullWidth />
      </Grid>
      <Grid item xs={8}>
        <TextField
          id='short_url'
          label='Short URL - optional'
          value={formData.short_url}
          onChange={handleChange}
          fullWidth
          helperText= 'Must be 4 Characters Long. Alphanumeric Characters Only.' />
      </Grid>
      <Grid item>
        <Button variant='outlined' onClick={handleSubmit}>{ mode === 'new' ? 'Save New Shortcode' : 'Update Shortcode' }</Button>
      </Grid>
    </Form>      
  )
}

export default CodeForm