import React from 'react';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
import Navbar from './components/navbar/Navbar';
import RedirectPage from './pages/Redirect/RedirectPage';

function App() {
  const { authUser, loadingUser } = useAuthContext();

  if (loadingUser) return <div className="spinner"></div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to="/login" replace />} />
        <Route path='/login' element={authUser ? <Navigate to="/" replace /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to="/" replace /> : <Signup />} />
         <Route path='/auth/redirect' element={<RedirectPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
