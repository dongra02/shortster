import React, { useState, useEffect } from 'react'

import LoginForm from '../auth/LoginForm'
import CodeList from '../code/CodeList'

import { getUserCodes } from '../../lib/api'

import Typography from '@material-ui/core/Typography'

const Home = ({ app, loggedIn }) => {

  const [userCodes, setUserCodes] = useState(null)
  const [isAuth, setIsAuth] = useState(loggedIn)
  const [codeListUpdate, setCodeListUpdate] = useState(false)
  const [fetchError, setFetchError] = useState(null)

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
        setFetchError(null)
        setUserCodes(response.data)
      } catch (err) {
        setFetchError(err.response.data)
      }
    }
    if (isAuth) getCodes()
  }, [isAuth, codeListUpdate])

  return (
    <>
      {fetchError && <Typography>Something has gone horribly wrong...</Typography>}
      {!isAuth && <LoginForm app={app} handleAuth={handleAuth}/>}
      {isAuth && <CodeList userCodes={userCodes} handleCodeListUpdate={handleCodeListUpdate}/>}
    </>
  )
}

export default Home