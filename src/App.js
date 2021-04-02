import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home/Home";
import NotFound from "./components/ErrorNotFound/NotFound";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import { auth } from "./Firebase";
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./components/Orders/Orders";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./components/CheckOut/CheckOut";
import PrivateRoute, {
  PrivateRoute2,
} from "./components/PrivateRoute/PrivateRoute";
import Deals from "./components/Deals/Deals";
export const userContext = React.createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user found", user);
        setLoggedInUser(user);
      } else {
        console.log("user not found");
        setLoggedInUser({});
      }
    });
  }, [setLoggedInUser]);

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute2 path="/login">
            <Login />
          </PrivateRoute2>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/checkout">
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute path="/deals">
            <Deals />
          </PrivateRoute>
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
