/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'

import { getCodeStats } from '../../lib/api'
import { isShortCodeOwner } from '../../lib/auth'

import { StyledCard, StyledCardButton } from '../../elements/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'

const CodeStats = () => {

  const [shortcode, setShortCode] = useState(null)
  const { shortUrl } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getShortcode = async() => {
      try {
        const response = await getCodeStats(shortUrl)
        setShortCode(response.data)
      } catch (err) {
        history.push('/')
      }
    }
    getShortcode()
  }, [])

  while (!shortcode) return <Typography>Loading...</Typography>
  
  let accessDate
  if (shortcode.last_access) {
    accessDate = new Date(shortcode.last_access).toLocaleDateString()
  }
  const createdDate = new Date(shortcode.created).toLocaleDateString()
  

  return (
    <StyledCard>
      {isShortCodeOwner(shortcode.owner) &&
        <CardContent>
          <Typography variant='h3' align='center' color='primary'>{shortcode.short_url}</Typography>
          <Typography variant='h6' align='center'>Full Url</Typography>
          <Typography variant='body2' align='center'>{shortcode.full_url}</Typography>
          <Typography variant='h6' align='center'>Access Count</Typography>
          <Typography variant='body2' align='center'>{shortcode.access_count > 0 ? shortcode.access_count : 'Not Yet Accessed'}</Typography>
          {shortcode.access_count > 0 ? <Typography variant='h6' align='center'>Last Accessed</Typography> : ''}
          <Typography variant='body2' align='center'>{accessDate}</Typography>
          <Typography variant='h6' align='center'>Created</Typography>
          <Typography variant='body2' align='center'>{createdDate}</Typography>
        </CardContent>}
      <CardActions>
        <StyledCardButton color='primary' component={Link} to={'/'}>Back To My Shortcodes</StyledCardButton>
      </CardActions>
    </StyledCard>
  )
}

export default CodeStats