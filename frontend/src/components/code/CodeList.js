import React from 'react'

import CodeListItem from './CodeListItem'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const CodeList = ({ userCodes }) => {

  while (!userCodes) return <div>loading</div>

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Shortcode</TableCell>
              <TableCell>Full URL</TableCell>
              <TableCell>Created</TableCell>
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