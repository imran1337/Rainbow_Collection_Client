import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { auth } from "../../Firebase";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [orderedProduct, setOrderedProduct] = useState([]);

  const getOrder = async () => {
    if (!auth.currentUser) {
      return alert(
        "auth token not found. Click Home then comeback again Orders"
      );
    }

    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await axios(`https://nameless-lowlands-72199.herokuapp.com/get-orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${idToken}`,
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
    <div className="d-flex flex-wrap justify-content-center align-items-center">
      {orderedProduct.map((pd) => {
        return (
          <Card
            style={{
              maxWidth: "280px",
              minWidth: "280px",
              maxHeight: "120px",
              minHeight: "120px",
            }}
            className="m-2"
          >
            <Card.Body>
              <Row>
                <Col xs={4}>
                  <img
                    style={{ maxWidth: "50px" }}
                    className="img-fluid"
                    src={pd.imageURL}
                    alt="product"
                  />
                </Col>
                <Col xs={8}>{pd.name}</Col>
              </Row>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default Orders;
