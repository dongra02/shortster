import React, { useState } from 'react'

import AppBar from '@material-ui/core/AppBar'
import { StyledToolBar, StyledHeaderType, StyledIconBtn } from '../../elements/HeaderBar'
import Button from '@material-ui/core/Button'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const Header = ({ app, loggedIn }) => {

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static'>
      <StyledToolBar>
        <StyledHeaderType variant='h2' >Shortster</StyledHeaderType>
        {loggedIn && (
          <>
            <StyledIconBtn onClick={handleOpenMenu}>
              <AccountCircleOutlinedIcon />
            </StyledIconBtn>
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
      </StyledToolBar>
    </AppBar>
  )
}

export default Header