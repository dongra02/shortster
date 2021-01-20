import React, { useState, useEffect } from 'react'

import LoginForm from '../auth/LoginForm'
import CodeList from '../code/CodeList'

import { getUserCodes } from '../../lib/api'

const Home = ({ app, loggedIn }) => {

  const [userCodes, setUserCodes] = useState(null)
  const [isAuth, setIsAuth] = useState(loggedIn)
  const [codeListUpdate, setCodeListUpdate] = useState(false)

  const handleAuth = () => {
    setIsAuth(true)
  }

  const handleCodeListUpdate = () => {
    setCodeListUpdate(!codeListUpdate)
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
  }, [isAuth, codeListUpdate])

  return (
    <>
      {!isAuth && <LoginForm app={app} handleAuth={handleAuth}/>}
      {isAuth && <CodeList userCodes={userCodes} handleCodeListUpdate={handleCodeListUpdate}/>}
    </>
  )
}

export default Home