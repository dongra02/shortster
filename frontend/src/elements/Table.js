import TableContainer from '@material-ui/core/TableContainer'
import Typography from '@material-ui/core/Typography'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'

export const StyledTitleType = withStyles((theme) => ({
  root: {
    color: theme.palette.text.primary
  }
}))(Typography)

export const StyledTableContainer = withStyles(() => ({
  root: {
    border: '1px solid #43bce7',
    borderRadius: '15px',
    maxHeight: 400,
    overflowY: 'scroll',
    margin: '0 auto'
  }
}))(TableContainer)

export const StyledTableHeadCell = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    fontSize: '1.3rem'
  }
}))(TableCell)

export const StyledTableRow = withStyles(() => ({
  root: {
    height: 40,
    '&:nth-of-type(odd)': {
      backgroundColor: '#f3f3f3'
    }
  }
}))(TableRow)

export const StyledTableBodCell = withStyles(() => ({
  root: {
    fontSize: '1.2rem'
  }
}))(TableCell)

