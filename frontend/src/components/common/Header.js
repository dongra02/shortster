import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'

import { isAuthenticated } from '../../lib/auth'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(() => ({
  toolbar: {
    minHeight: 80,
    color: '#fff'
  }
}))

const Header = ({ app }) => {

  const [anchorEl, setAnchorEl] = useState(null)
  // const history = useHistory()

  // const handleLogout = () => {
  //   localStorage.removeItem('token')
  //   history.push('/')
  // }

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  // const handleCloseMenu = () => {
  //   setAnchorEl(null)
  // }

  const classes = useStyles()

  return (
    <AppBar position='static'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h2'>Shortster</Typography>
        {isAuthenticated() && (
          <>
            <IconButton onClick={handleOpenMenu}>
              <AccountCircleOutlinedIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
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