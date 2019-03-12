import React from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Item>
      <Link to="/places">Places</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/place-create">Log a Place</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/change-password">Change Password</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/sign-out">Sign Out</Link>
    </Nav.Item>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Nav.Item>
      <Link to="/sign-up">Sign Up</Link>
    </Nav.Item>
    <Nav.Item>
      <Link to="/sign-in">Sign In</Link>
    </Nav.Item>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Nav.Item>
      <Link to="/">Home</Link>
    </Nav.Item>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h1>Where in the World...?</h1>
    <Nav className='navbar'>
      { user && <span>Welcome, {user.email}</span>}
      { alwaysOptions }
      { user ? authenticatedOptions : unauthenticatedOptions }
    </Nav>
  </header>
)

export default Header
