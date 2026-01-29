import React from 'react';
import './Navbar.css';
import LogoutButton from './LogoutButton';
import { useAuthContext } from '../../context/AuthContext';
import useDeleteUser from '../../hooks/useDeleteUser';

function Navbar() {
  const { authUser } = useAuthContext();
  const { deleteUser } = useDeleteUser();

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

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

              <button
                className='delete-user-btn'
                onClick={deleteUser}
              >
                🗑 Delete Account
              </button>

              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
