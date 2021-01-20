import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { withStyles } from '@material-ui/core/styles'


export const StyledFooterGrid = withStyles((theme) => ({
  root: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 0,
    backgroundColor: theme.palette.primary.main,
    color: '#fff'
  }
}))(Grid)

export const StyledFooterType = withStyles(() => ({
  root: {
    fontSize: '.8rem'
  }
}))(Typography)

export const StyledFootLink = withStyles(() => ({
  root: {
    color: '#fff',
    fontSize: '.8rem',
    textDecoration: 'underline'
  }
}))(Link)