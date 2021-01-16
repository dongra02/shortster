import React from 'react'
import UserForm from '../auth/UserForm'
import CodeList from '../code/CodeList'

const Home = ({ handleLogin, userCodes, isAuthenticated }) => {
  console.log(userCodes)

  return (
    <div>
      {!isAuthenticated && <UserForm handleLogin={handleLogin}/>}
      {isAuthenticated && <CodeList userCodes={userCodes} />}
    </div>
  )
}

export default Home