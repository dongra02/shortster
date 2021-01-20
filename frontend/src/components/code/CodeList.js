import React from 'react'
import { Link } from 'react-router-dom'

import CodeListItem from './CodeListItem'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import { StyledTableContainer, StyledTableHeadCell, StyledTitleType } from '../../elements/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'

const CodeList = ({ userCodes, handleCodeListUpdate }) => {

  while (!userCodes) return <div>loading</div>

  return (
    <>
      <Grid container justify='center'>
        <StyledTitleType variant='h3'>My Shortcodes</StyledTitleType>
        <IconButton component={Link} to={'/new'}>
          <AddCircleOutlineOutlinedIcon fontSize='large'/>
        </IconButton>
      </Grid>
      <StyledTableContainer>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Shortcode</StyledTableHeadCell>
              <StyledTableHeadCell>Full URL</StyledTableHeadCell>
              <StyledTableHeadCell>Created</StyledTableHeadCell>
              <StyledTableHeadCell align='center'>Manage</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userCodes.map(code => <CodeListItem key={code.id} {...code} handleCodeListUpdate={handleCodeListUpdate}/>)}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  )
}

export default CodeList