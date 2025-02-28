import { Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
