import React from 'react'

import UserForm from '../auth/UserForm'
import CodeList from '../code/CodeList'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  main: {
    marginTop: '2rem'
  }
}))

const Home = ({ handleLogin, userCodes, isAuthenticated }) => {
  console.log(userCodes)

  const classes = useStyles()

  return (
    <div>
      <Container className={classes.main}>
        {!isAuthenticated && <UserForm handleLogin={handleLogin}/>}
        {isAuthenticated && <CodeList userCodes={userCodes} />}
      </Container>
    </div>
  )
}

export default Home