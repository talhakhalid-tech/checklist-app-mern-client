import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...restProps }) {
  return (
    <Route
      {...restProps}
      component={(props) => {
        if (localStorage.getItem("checklist-auth-token")) {
          return <Component {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
