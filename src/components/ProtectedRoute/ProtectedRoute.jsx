import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, currentUser, isLoggedIn }) => {
  return currentUser && isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
