import React from "react";
import { Button, Card } from "react-bootstrap";
import chipsImg from "./../../resourses/images/image.png";
import "./HomeProductCard.css";

const HomeProductCard = () => {
  return (
    <Card
      className="card_style m-3"
      style={{
        width: "18rem",
        backgroundColor: "#e3f2fd",
        boxShadow: "0 10px 20px 0 rgb(0 0 0 / 5%)",
      }}
    >
      <Card.Img
        variant="top"
        className="p-3 img-fluid"
        style={{ maxWidth: "286px", maxHeight: "286px" }}
        src={chipsImg}
        alt="product img"
      />
      <Card.Body>
        <Card.Title
          className="text-center font-weight-bold"
          style={{ fontWeight: "24px" }}
        >
          Marks Full Cream Milk Powder Foil
        </Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="price align-self-center font-weight-bold text-primary"
            style={{ fontSize: "36px" }}
          >
            <span>$23</span>
          </div>
          <Button variant="primary">Buy Now</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default HomeProductCard;
