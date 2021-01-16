import React from 'react'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'

const CodeList = ({ userCodes }) => {

  return (
    userCodes.map(code => {
      return (
        <>
          <div key={code.id}>{code.short_url}</div>
          <Button>
            <Link to={`/${code.short_url}/stats`}>Stats</Link>
          </Button>
        </>
      )
    })
  )
}

export default CodeList