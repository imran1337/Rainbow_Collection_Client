import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
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
          <Nav className="ml-auto">
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
            <Button variant="primary" className="nav-link w-100">
              <Link className="px-3 font-weight-bold text-dark" to="/login">
                Login
              </Link>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
