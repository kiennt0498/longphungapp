import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLogin = sessionStorage.getItem("isLogin");
  return isLogin ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;