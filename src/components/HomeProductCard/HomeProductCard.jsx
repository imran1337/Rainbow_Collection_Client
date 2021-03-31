import React from "react";
import { Button, Card } from "react-bootstrap";
import "./HomeProductCard.css";
import { userContext } from "./../../App";
import { auth } from "./../../Firebase";
import axios from "axios";

const HomeProductCard = ({ _id, name, price, imageURL }) => {
  const [loggedInUser, setLoggedInUser] = React.useContext(userContext);

  const { displayName, email } = loggedInUser;
  console.log(loggedInUser);
  const buyNow = async (_id) => {
    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const orderDetails = {
        userName: displayName,
        email,
        productId: _id,
      };

      const response = await axios(`http://localhost:5000/submit-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${idToken}`,
        },
        data: orderDetails,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className="card_style m-3 d-flex justify-content-center align-items-center"
      style={{
        width: "370px",
        height: "450px",
        backgroundColor: "#e3f2fd",
        boxShadow: "0 10px 20px 0 rgb(0 0 0 / 5%)",
      }}
    >
      <Card.Img
        variant="top"
        className="p-3 img-fluid"
        style={{ maxWidth: "286px", maxHeight: "286px" }}
        src={imageURL}
        alt="product img"
      />
      <Card.Body className="d-flex flex-column justify-content-center">
        <Card.Title
          className="text-center font-weight-bold"
          style={{ fontWeight: "24px" }}
        >
          {name}
        </Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="price align-self-center font-weight-bold text-primary"
            style={{ fontSize: "36px" }}
          >
            <span>&#2547;{price}</span>
          </div>
          <Button variant="primary" onClick={() => buyNow(_id)}>
            Buy Now
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeProductCard;
