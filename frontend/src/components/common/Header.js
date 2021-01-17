import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
  toolbar: {
    minHeight: 150
  }
}))

const Header = ({ isAuthenticated, handleLogout }) => {

  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h4'>Shortster</Typography>
        {isAuthenticated && <Button variant='outlined' onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  )
}

export default Header