/* eslint-disable camelcase */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { deleteShortcode } from '../../lib/api'

import { StyledTableRow, StyledTableBodCell } from '../../elements/Table'
import TableCell from '@material-ui/core/TableCell'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'

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
      <StyledTableBodCell>{short_url}</StyledTableBodCell>
      <StyledTableBodCell>{full_url}</StyledTableBodCell>
      <StyledTableBodCell>{createdDate}</StyledTableBodCell>
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