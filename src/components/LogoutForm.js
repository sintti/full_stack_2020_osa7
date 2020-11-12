import React from 'react'

const LogoutForm = ({ user }) => {


  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogilistaUser')
    window.location.reload()
  }

  return (
    <div className="logout-form">
      Logged in as {user.name}
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutForm