import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";
import { userContext } from "./../../App";
import SimpleMenu from "./SimpleMenu/SimpleMenu";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      variant="light"
      style={{
        backgroundColor: "#e3f2fd",
        boxShadow: "0 10px 20px 0 rgb(0 0 0 / 5%)",
        fontWeight: "bold",
      }}
    >
      <Container id="needFluidOnXs">
        <Navbar.Brand href="#home">
          <Link to="/home">Rainbow Collection</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto d-flex align-items-center">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            <Link to="/dashboard" className="nav-link">
              Admin
            </Link>
            <Link to="/deals" className="nav-link">
              Deals
            </Link>
            {(loggedInUser?.email && (
              <>
                <Link to="/checkout" className="nav-link">
                  Cart
                </Link>{" "}
                <SimpleMenu />
              </>
            )) || (
              <Link
                className="px-3 font-weight-bold text-dark nav-link"
                to="/login"
              >
                <Button variant="primary" className="w-100">
                  Login
                </Button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
