import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 80,
    color: '#fff'
  },
  title: {
    flexGrow: 1
  },
  menuAnchor: {
    marginRight: theme.spacing(2)
  }
}))

const Header = ({ app, loggedIn }) => {

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant='h2' >Shortster</Typography>
        {loggedIn && (
          <>
            <IconButton className={classes.menuAnchor} onClick={handleOpenMenu}>
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
              <MenuItem>
                <Button href='/'>My Codes</Button>
              </MenuItem>
              <MenuItem>
                <Button onClick={app.handleLogOut} href='/'>Logout</Button>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header