/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { getCodeStats } from '../../lib/api'
import { isShortCodeOwner } from '../../lib/auth'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  main: {
    border: '1px solid #43bce7',
    borderRadius: '15px',
    maxWidth: 400,
    margin: '0 auto'
  },
  button: {
    margin: '0 auto'
  }
}))

const CodeStats = () => {

  const [shortcode, setShortCode] = useState(null)
  const { shortUrl } = useParams()
  
  const classes = useStyles()

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
  
  let accessDate
  if (shortcode.last_access) {
    accessDate = new Date(shortcode.last_access).toLocaleDateString()
  }
  const createdDate = new Date(shortcode.created).toLocaleDateString()
  

  return (
    <Card className={classes.main}>
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
        <Button color='primary' className={classes.button} component={Link} to={'/'}>Back To My Shortcodes</Button>
      </CardActions>
    </Card>
  )
}

export default CodeStats