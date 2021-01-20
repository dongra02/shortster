import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { accessShortCode } from '../../lib/api'

import Typography from '@material-ui/core/Typography'

const CodeAccess = () => {
  const { shortUrl } = useParams()
  const [errorStatus, setErrorStatus] = useState(null)

  useEffect(() => {
    const getCode = async () => {
      try {
        const response = await accessShortCode(shortUrl)
        const fullUrl = response.data.full_url
        window.location.href = fullUrl
      } catch (err) {
        setErrorStatus(err.response.status)
      }
    }
    getCode()
  }, [])

  return (
    <>
      {errorStatus === 404 && <Typography>Oh no, this link is not functioning. Click <Link to='/'>here</Link> to return to home.</Typography>}
      {!errorStatus && <Typography>Redirecting...</Typography>}
    </>
  )
}

export default CodeAccess