import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'

export const StyledToolBar = withStyles(() => ({
  root: {
    minHeight: 80,
    color: '#fff'
  }
}))(Toolbar)

export const StyledHeaderType = withStyles(() => ({
  root: {
    flexGrow: 1
  }
}))(Typography)

export const StyledIconBtn = withStyles((theme)=> ({
  root: {
    marginRight: theme.spacing(2),
    color: '#fff'
  }
}))(IconButton)