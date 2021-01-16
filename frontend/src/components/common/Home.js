import React from 'react'
import UserForm from '../auth/UserForm'

const Home = ({ userCodes }) => {
  

  return (
    <div>
      {userCodes && userCodes.map(code => (
        <h1 key={code}>{code}</h1>
      ))}
      {!userCodes && <UserForm />}
    </div>
  )
}

export default Home