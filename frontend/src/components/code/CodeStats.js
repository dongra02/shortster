/* eslint-disable camelcase */
import React from 'react'

import { getCodeStats } from '../../lib/api'

import Typography from '@material-ui/core/Typography'

class CodeStats extends React.Component {
  state = {
    shortcode: null
  }

  componentDidMount = () => {
    this.getCode()
  }

  getCode = async () => {
    try {
      const shortUrl = this.props.match.params.shortUrl
      const response = await getCodeStats(shortUrl)
      console.log(response)
      this.setState({ shortcode: response.data })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    
    while (!this.state.shortcode) return <div>loading</div>

    const { full_url, short_url, last_access, access_count, created } = this.state.shortcode


    return (
      <div>
        <Typography>Short Url: {short_url}</Typography>
        <Typography>Full Url: {full_url}</Typography>
        <Typography>Access Count: {access_count}</Typography>
        <Typography>Last Accessed: {last_access}</Typography>
        <Typography>Created: {created}</Typography>
      </div>
    )
  }
}

export default CodeStats