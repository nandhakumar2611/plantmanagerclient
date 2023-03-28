import React from 'react'
import dataService from "../../Service/dataService";
const User = () => {

  const currentUser = dataService.getUser()
  return (
    <div>Manager User
      {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
    </div>
  )
}

export default User