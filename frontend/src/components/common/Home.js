import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'

import LoginForm from '../auth/LoginForm'
import CodeList from '../code/CodeList'

import { getUserCodes } from '../../lib/api'

const Home = ({ app, loggedIn }) => {

  const [userCodes, setUserCodes] = useState(null)
  const [isAuth, setIsAuth] = useState(loggedIn)

  const handleAuth = () => {
    setIsAuth(true)
  }

  useEffect(() => {
    const getCodes = async () => {
      try {
        const response = await getUserCodes()
        setUserCodes(response.data)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    if (isAuth) getCodes()
  }, [isAuth])

  return (
    <>
      {!isAuth && <LoginForm app={app} handleAuth={handleAuth}/>}
      {isAuth && <CodeList userCodes={userCodes}/>}
    </>
  )
}

export default Home