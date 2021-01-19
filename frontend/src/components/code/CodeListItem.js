/* eslint-disable camelcase */
import React from 'react'

// import Grid from '@material-ui/core/Grid'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
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

const CodeListItem = ({ short_url, full_url, created }) => {

  return (
    <StyledTableRow>
      <TableCell>
        <Typography>{short_url}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{full_url}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{created}</Typography>
      </TableCell>
      <TableCell align='center'>
        <IconButton>
          <InfoOutlinedIcon fontSize='large'/>
        </IconButton>
        <IconButton>
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