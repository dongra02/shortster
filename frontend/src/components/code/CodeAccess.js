import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { accessShortCode } from '../../lib/api'

import Typography from '@material-ui/core/Typography'

const CodeAccess = () => {
  const { shortUrl } = useParams()

  useEffect(() => {
    const getCode = async () => {
      try {
        const response = await accessShortCode(shortUrl)
        const fullUrl = response.data.full_url
        console.log(fullUrl)
        window.location.href = fullUrl
      } catch (err) {
        console.log(err)
      }
    }
    getCode()
  }, [])

  return (
    <Typography>Redirecting! Shortcode owners click <Link to='/'>here.</Link> if something went wrong! </Typography>
  )
}

export default CodeAccess