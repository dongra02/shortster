import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
    <Typography>This should redirect</Typography>
  )
}

export default CodeAccess