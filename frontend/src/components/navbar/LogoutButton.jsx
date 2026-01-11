import React from 'react';
import useLogout from '../../hooks/useLogout';
import { BiLogOut } from "react-icons/bi";
import './LogoutButton.css';

function LogoutButton() {
  const { loading, logout } = useLogout();

  return (
    <button className="logout-button" onClick={logout}>
      {!loading ? (
        <BiLogOut className="logout-icon" />
      ) : (
        <span className="spinner"></span>
      )}
    </button>
  )
}

export default LogoutButton;
