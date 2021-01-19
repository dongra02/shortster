import React from 'react'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  main: {
    border: '1px solid #43bce7',
    borderRadius: '15px',
    maxWidth: '40%',
    margin: '0 auto',
    padding: theme.spacing(3)
  }
}))

const Form = (props)=> {

  const classes = useStyles()

  return (
    <Paper className={classes.main} >
      <Grid container spacing={2} justify='center' alignItems='center'>
        {props.children}
      </Grid>
    </Paper>
  )
}

export default Form