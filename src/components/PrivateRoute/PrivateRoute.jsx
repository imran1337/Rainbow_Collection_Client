import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { userContext } from "./../../App";
import { auth } from "./../../Firebase";

const PrivateRoute = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.currentUser && auth.currentUser?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const PrivateRoute2 = ({ children, ...rest }) => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.currentUser && auth.currentUser?.email ? (
          <Redirect to="/home" />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
