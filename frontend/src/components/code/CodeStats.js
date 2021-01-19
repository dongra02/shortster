/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { getCodeStats } from '../../lib/api'
import { isShortCodeOwner } from '../../lib/auth'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const CodeStats = (props) => {

  const [shortcode, setShortCode] = useState(null)
  const shortUrl = props.match.params.shortUrl

  useEffect(() => {
    const getShortcode = async() => {
      try {
        const response = await getCodeStats(shortUrl)
        setShortCode(response.data)
      } catch (err) {
        console.log(err.response.data)
      }
    }
    getShortcode()
  }, [])

  while (!shortcode) return <div>loading</div>

  return (
    <>
      {isShortCodeOwner(shortcode.owner) &&
        <div>
          <Typography>Short Url: {shortcode.short_url}</Typography>
          <Typography>Full Url: {shortcode.full_url}</Typography>
          <Typography>Access Count: {shortcode.access_count}</Typography>
          <Typography>Last Accessed: {shortcode.last_access}</Typography>
          <Typography>Created: {shortcode.created}</Typography>
        </div>}
      <Button>
        <Link to={`/${shortcode.short_url}/edit`} >Edit</Link>
      </Button>
    </>
  )
}

export default CodeStats