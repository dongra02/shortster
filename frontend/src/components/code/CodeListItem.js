/* eslint-disable camelcase */
import React from 'react'
import { Link } from 'react-router-dom'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { withStyles } from '@material-ui/core/styles'

const StyledTableRow = withStyles(() => ({
  root: {
    height: 40,
    '&:nth-of-type(odd)': {
      backgroundColor: '#f3f3f3'
    }
  }
}))(TableRow)

const StyledTableCell = withStyles(() => ({
  root: {
    fontSize: '1.2rem'
  }
}))(TableCell)

const CodeListItem = ({ short_url, full_url, created }) => {

  if (full_url.length > 20) {
    full_url = `${full_url.slice(0, 20)}...`
  }

  const createdDate = new Date(created).toLocaleDateString()

  return (
    <StyledTableRow>
      <StyledTableCell>{short_url}</StyledTableCell>
      <StyledTableCell>{full_url}</StyledTableCell>
      <StyledTableCell>{createdDate}</StyledTableCell>
      <TableCell align='center'>
        <IconButton component={Link} to={`/${short_url}/stats`}>
          <InfoOutlinedIcon fontSize='large'/>
        </IconButton>
        <IconButton component={Link} to={`/${short_url}/edit`}>
          <EditOutlinedIcon color='primary' fontSize='large'/>
        </IconButton>
        <IconButton>
          <DeleteOutlinedIcon color='secondary' fontSize='large'/>
        </IconButton>
      </TableCell>
    </StyledTableRow>
  )
}

export default CodeListItem