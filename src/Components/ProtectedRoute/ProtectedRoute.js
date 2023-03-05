import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, destination, children }) => {
  if (!isLoggedIn) {
    return <Navigate to={destination} replace />;
  }
  return children;
};

export default ProtectedRoute;