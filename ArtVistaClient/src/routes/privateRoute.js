import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../pages/Auth/authProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;