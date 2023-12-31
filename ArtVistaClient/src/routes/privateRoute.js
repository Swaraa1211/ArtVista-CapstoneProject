import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (JSON.parse(userToken)) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === undefined) {
    return <p>Loading....</p>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;