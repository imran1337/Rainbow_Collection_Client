import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PersistentDrawerLeft from "./../Drawer/Drawer";

const Dashboard = () => {
  window.document.title = "Rainbow || Dashboard";
  return (
    <Container fluid>
      <PersistentDrawerLeft />
    </Container>
  );
};

export default Dashboard;