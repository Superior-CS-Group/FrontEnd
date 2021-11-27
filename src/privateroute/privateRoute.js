import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/auth.page";
export default function PrivateRoute({ children, ...rest }) {
  let auth = Auth();
  return (
    <Route
      {...rest}
      render={() => (auth ? children : <Navigate replace={true} to="/login" />)}
    />
  );
}
