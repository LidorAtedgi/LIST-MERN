import React, { useState } from 'react';
import './Navbar.css';
import LogoutButton from './LogoutButton';
import { useAuthContext } from '../../context/AuthContext';
import useDeleteUser from '../../hooks/useDeleteUser';
import { Link } from 'react-router-dom';

function Navbar() {
  const { authUser } = useAuthContext();
  const { deleteUser } = useDeleteUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-left'>
          <Link to="/" className='navbar-logo-link'>
            <h1 className='navbar-logo'>📝 Todo list</h1>
          </Link>
          <a href="/privacy-policy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>
        </div>
        <div className='navbar-right'>
          {authUser && (
            <>
              {/* Hamburger Menu Button */}
              <button 
                className='menu-toggle' 
                onClick={toggleMenu}
                aria-label="תפריט"
              >
                <span className='hamburger-icon'>⋮</span>
              </button>

              {/* Menu Items */}
              <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
                <span className='navbar-username'>
                  👤 {capitalize(authUser.username)}
                </span>
                <button
                  className='delete-user-btn'
                  onClick={deleteUser}
                >
                  🗑 Delete Account
                </button>
                <LogoutButton />
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
