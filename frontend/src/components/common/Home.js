import React, { useState, useEffect } from 'react'

import UserForm from '../auth/UserForm'
import CodeList from '../code/CodeList'

import { getUserCodes } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  main: {
    marginTop: theme.spacing(7),
    padding: theme.spacing(2)
  }
}))

const Home = () => {

  const [loggedIn, setLoggedIn] = useState(isAuthenticated())

  const handleLogin = () => setLoggedIn(true)

  const [userCodes, setUserCodes] = useState(null)

  useEffect(() => {
    const getCodes = async () => {
      try {
        const response = await getUserCodes()
        setUserCodes(response.data)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    if (loggedIn) getCodes()
  }, [loggedIn])

  const classes = useStyles()

  return (
    <Container className={classes.main}>
      {!loggedIn && <UserForm handleLogin={handleLogin}/>}
      {loggedIn && <CodeList userCodes={userCodes}/>}
    </Container>
  )
}

export default Home