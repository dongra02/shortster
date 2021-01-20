import React from 'react'

import Grid from '@material-ui/core/Grid'
// import Link from '@material-ui/core/Link'
import { StyledFooterGrid, StyledFooterType, StyledFootLink } from '../../elements/FooterGrid'

const Footer = () => {

  return (
    <StyledFooterGrid container spacing={2} alignItems='center'>
      <Grid item>
        <StyledFooterType>An Application by <StyledFootLink href='https://www.don-graham.dev' target='_blank'>don-graham.dev</StyledFootLink></StyledFooterType>
      </Grid>
    </StyledFooterGrid>
  )
}

export default Footer