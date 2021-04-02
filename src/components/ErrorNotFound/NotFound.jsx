import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

const NotFound = () => {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <h1 className="text-danger">Not Found!</h1>
      <Button variant="info" onClick={history.goBack}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;