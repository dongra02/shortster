import React, { useState, useEffect } from 'react'

import UserForm from '../auth/UserForm'
import CodeList from '../code/CodeList'

import { getUserCodes } from '../../lib/api'

import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  main: {
    marginTop: '2rem'
  }
}))

const Home = ({ handleLogin, isAuthenticated }) => {
  
  const [userCodes, setUserCodes] = useState([])
  
  useEffect(() => {
    
  })

  useEffect(() => {
    const getCodes = async () => {
      try {
        const response = await getUserCodes()
        setUserCodes(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    if (isAuthenticated) getCodes()
  }, [isAuthenticated])

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