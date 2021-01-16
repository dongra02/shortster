import React from 'react'
import UserForm from '../auth/UserForm'

const Home = ({ handleLogin, userCodes, isAuthenticated }) => {
  

  return (
    <div>
      {isAuthenticated && userCodes.map(code => (
        <h1 key={code}>{code}</h1>
      ))}
      {!isAuthenticated && <UserForm handleLogin={handleLogin}/>}
    </div>
  )
}

export default Home