import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import { useAuth } from '../../context/AuthContext';
import './style.css';

const Layout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  // Determine which page we're on
  const isWTPPage = location.pathname === '/wtp';
  const isComparePage = location.pathname === '/compare';

  return (
    <div className="app-wrapper">
      <Navbar 
        user={user}
        logout={logout}
        showFavorites={showFavorites}
        toggleFavorites={toggleFavorites}
        isWTPPage={isWTPPage}
        isComparePage={isComparePage}
      />
      <main className="main-content">
        <Outlet context={{ showFavorites }} />
      </main>
    </div>
  );
};

export default Layout; 