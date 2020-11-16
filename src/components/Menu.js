import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

const Menu = () => {
  const loggedUser = useSelector(state => state.login)

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogilistaUser')
    window.location.reload()
  }

  return (
  <Navbar collapseOnSelect expand='lg'>
    <Nav.Link as={Link} to='/' href='#'>
        <h1>Blogilista</h1>
    </Nav.Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className='mr-auto'>
        <Nav.Link as={Link} to='/blogs' href='#'>
          Blogit
        </Nav.Link>
        <Nav.Link as={Link} to='/users' href='#'>
          Käyttäjät
        </Nav.Link>
        <Nav.Link href='#' onClick={handleLogout}>
          Logout {loggedUser.name}
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )
}

export default Menu