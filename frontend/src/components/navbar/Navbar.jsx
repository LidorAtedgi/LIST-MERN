import React from 'react'
import './Navbar.css'
import LogoutButton from './LogoutButton'
import { useAuthContext } from '../../context/AuthContext'

function Navbar() {
  const { authUser } = useAuthContext();

  const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-left'>
          <h1 className='navbar-logo'>📝 Todo list</h1>
            <a href="/privacy-policy" target="_blank" rel="noreferrer">
                      Privacy Policy
                     </a>
        </div>
        
        <div className='navbar-right'>
          {authUser && (
            <>
              <span className='navbar-username'>
                👤 {capitalize(authUser.username)}
              </span>
              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
