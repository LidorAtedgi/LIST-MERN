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

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        <div className='navbar-left'>
          <Link to="/" className='navbar-logo-link'>
            <h1 className='navbar-logo'>📝 Todo list</h1>
          </Link>
        </div>
        <div className='navbar-right'>
          {authUser && (
            <>
              <button 
                className='menu-toggle' 
                onClick={toggleMenu}
                aria-label="תפריט"
              >
                <span className='hamburger-icon'>⋮</span>
              </button>

              <div className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
                <span className='navbar-username'>
                  👤 {capitalize(authUser.username)}
                </span>
                <Link 
                  to="/privacy-policy" 
                  className='menu-btn menu-btn-policy'
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                >
                  🔒 Privacy Policy
                </Link>
                <button
                  className='menu-btn menu-btn-delete'
                  onClick={() => { deleteUser(); closeMenu(); }}
                >
                  🗑 Delete Account
                </button>
                <div className='menu-btn-wrapper'>
                  <LogoutButton />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
