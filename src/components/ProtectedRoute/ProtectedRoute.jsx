import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const { currentUser } = useContext(CurrentUserContext);

  return currentUser && isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
