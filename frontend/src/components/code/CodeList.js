import React from 'react'

import CodeListItem from './CodeListItem'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  main: {
    maxWidth: '90%',
    maxHeight: '600px',
    overflow: 'scroll',
    outline: '1px solid black'
  }
}))

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    height: 60
  }
}))(TableRow)

const CodeList = ({ userCodes }) => {

  const classes = useStyles()

  while (!userCodes) return <div>loading</div>

  return (
    <>
      <TableContainer className={classes.main}>
        <Table size='small'>
          <TableHead>
            <StyledTableRow>
              <TableCell>Shortcode</TableCell>
              <TableCell>Full URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align='center'>Manage</TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {userCodes.map(code => <CodeListItem key={code.id} {...code} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default CodeList