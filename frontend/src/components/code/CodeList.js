import React from 'react'
import { Link } from 'react-router-dom'

import CodeListItem from './CodeListItem'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  main: {
    border: '1px solid #43bce7',
    borderRadius: '15px',
    maxHeight: 400,
    overflowY: 'scroll',
    margin: '0 auto'
  }
}))

const StyledTableCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    fontSize: '1.3rem'
  }
}))(TableCell)

const CodeList = ({ userCodes }) => {

  const classes = useStyles()

  while (!userCodes) return <div>loading</div>

  return (
    <>
      <Grid container justify='center'>
        <Typography variant='h3'>My Shortcodes</Typography>
        <IconButton component={Link} to={'/new'}>
          <AddCircleOutlineOutlinedIcon fontSize='large'/>
        </IconButton>
      </Grid>
      <TableContainer className={classes.main}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Shortcode</StyledTableCell>
              <StyledTableCell>Full URL</StyledTableCell>
              <StyledTableCell>Created</StyledTableCell>
              <StyledTableCell align='center'>Manage</StyledTableCell>
            </TableRow>
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