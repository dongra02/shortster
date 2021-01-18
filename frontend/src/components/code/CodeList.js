import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const CodeList = ({ userCodes }) => {

  while (!userCodes) return <div>loading</div>

  return (
    <Grid container>
      {userCodes.map(code => {
        return (
          <Grid container item key={code.id}>
            <Typography>{code.short_url}</Typography>
            <Button>
              <Link to={`/${code.short_url}/stats`}>Stats</Link>
            </Button>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default CodeList