import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/" />; 
  }

  return children; 
}
ProtectedRoute.propTypes = {
    children: PropTypes.string.isRequired
    
  };

export default ProtectedRoute;
