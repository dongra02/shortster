/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { deleteShortcode } from '../../lib/api'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
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

const CodeListItem = ({ short_url, full_url, created, handleCodeListUpdate }) => {
  const [confirmDel, setConfirmDel] = useState(false)

  const handleConfirmDel = () => {
    setConfirmDel(!confirmDel)
  }

  const handleDelete = async () => {
    try {
      const response = await deleteShortcode(short_url)
      handleCodeListUpdate()
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  if (full_url.length > 20) {
    full_url = `${full_url.slice(0, 20)}...`
  }

  const createdDate = new Date(created).toLocaleDateString()

  return (
    <StyledTableRow>
      <StyledTableCell>{short_url}</StyledTableCell>
      <StyledTableCell>{full_url}</StyledTableCell>
      <StyledTableCell>{createdDate}</StyledTableCell>
      {!confirmDel && <TableCell align='center'>
        <IconButton component={Link} to={`/${short_url}/stats`}>
          <InfoOutlinedIcon/>
        </IconButton>
        <IconButton component={Link} to={`/${short_url}/edit`}>
          <EditOutlinedIcon color='primary'/>
        </IconButton>
        <IconButton onClick={handleConfirmDel}>
          <DeleteOutlinedIcon color='secondary' />
        </IconButton>
      </TableCell>}
      {confirmDel && <TableCell align='center'>
        <Button color='secondary' onClick={handleDelete} component={Link} to={'/'}>Delete</Button>
        <Button color='primary' onClick={handleConfirmDel}>Cancel</Button>
      </TableCell>}
    </StyledTableRow>
  )
}

export default CodeListItem