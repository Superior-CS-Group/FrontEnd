import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLogin = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component {...props} currentUser={JSON.parse(isLogin)} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PrivateRoute;
