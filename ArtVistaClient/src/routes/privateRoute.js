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

// import { useContext, useState } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
// import { AuthContext } from '../pages/Auth/authProvider';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   //const { isAuthenticated } = useContext(AuthContext);
//   const [isLoggedIn, setIsLoggedIn] = useState()

//   useEffect(() => {
//     const userToken = JSON.parse(localStorage.getItem('userToken'));

//     if (userToken) {
      
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   return isAuthenticated ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default PrivateRoute;