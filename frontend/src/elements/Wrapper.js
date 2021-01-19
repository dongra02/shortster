import React from 'react'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  main: {
    marginTop: theme.spacing(7),
    padding: theme.spacing(2)
  }
}))

const Wrapper = (props) => {

  const classes = useStyles()

  return (
    <Container className={classes.main}>
      {props.children}
    </Container>
  )
}

export default Wrapper