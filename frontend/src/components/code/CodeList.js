import React from 'react'

const CodeList = ({ userCodes }) => {

  return (
    userCodes.map(code => {
      return (
        <div key={code.id}>{code.short_url}</div>
      )
    })
  )
}

export default CodeList