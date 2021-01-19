/* eslint-disable camelcase */
import React from 'react'

// import Grid from '@material-ui/core/Grid'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'

const CodeListItem = ({ short_url, full_url, created }) => {


  return (
    <TableRow>
      <TableCell>
        <Typography>{short_url}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{full_url}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{created}</Typography>
      </TableCell>
      <TableCell>
        <Typography>icons</Typography>
      </TableCell>
    </TableRow>
  )
}

export default CodeListItem