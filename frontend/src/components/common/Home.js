import React, { useState, useEffect } from 'react'

import LoginForm from '../auth/LoginForm'
import CodeList from '../code/CodeList'

import { getUserCodes } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'
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

  return (
    <>
      {!loggedIn && <LoginForm handleLogin={handleLogin}/>}
      {loggedIn && <CodeList userCodes={userCodes}/>}
    </>
  )
}

export default Home