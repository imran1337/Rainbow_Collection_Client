import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { auth } from "../../Firebase";
import "./Orders.css";
const Orders = () => {
  window.document.title = "Rainbow || Orders";
  const [orders, setOrders] = useState([]);
  const [orderedProduct, setOrderedProduct] = useState([]);

  const getOrder = async () => {
    if (!auth.currentUser) {
      return alert("auth token not found");
    }

    try {
      const response = await axios(`http://localhost:5000/get-orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      });
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const pdArray = [].flat(Infinity);

  useEffect(() => {
    orders.map((pd) => {
      const pdList = pd.products;
      pdArray.push(pdList);
      return setOrderedProduct(pdArray.flat(Infinity));
    });
  }, [orders, setOrders]);

  return (
    <>
      <h2 className="text-center my-4">
        {auth.currentUser.displayName || "Your"} order history
      </h2>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {orderedProduct.map((pd) => {
          const { name, price, imageURL, createdAt } = pd;
          return (
            <Card className="bg-dark text-white m-2 grow" style={{maxWidth:'420px'}}>
              <Card.Img
                src={imageURL}
                className="bg-style"
                alt="Product"
                style={{ filter: "blur(2px)" }}
              />
              <Card.ImgOverlay className="d-flex justify-content-center flex-column align-items-center">
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                  <h3>&#2547;{price}</h3>
                </Card.Text>
                <Card.Text>
                  <i>
                    Order Submitted on {new Date(createdAt).toLocaleString()}
                  </i>
                </Card.Text>
              </Card.ImgOverlay>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Orders;
