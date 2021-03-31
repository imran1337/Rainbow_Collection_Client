import axios from "axios";
import React, { useEffect, useState } from "react";
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
      const response = await axios(`http://localhost:5000/get-orders`, {
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

  const getOrderProductDetailsById = async () => {
    if (!auth.currentUser) {
      return alert(
        "auth token not found. Click Home then comeback again Orders"
      );
    }

    const filterProductId = orders.map((d) => d.productId);
    const filterUnique = filterProductId.filter(
      (d, i) => filterProductId.indexOf(d) === i
    );

    try {
      const idToken = await auth.currentUser.getIdToken(true);
      const response = await axios(
        "http://localhost:5000/get-product-details-by-id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${idToken}`,
          },
          data: filterUnique,
        }
      );
      setOrderedProduct(response.data);
      console.log("here", response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getOrderProductDetailsById();
    console.log("running hook");
  }, [orders]);

  return (
    <div>
     {orderedProduct.map(pd => {
       return <h1>{pd.name}</h1>
     })}
    </div>
  );
};

export default Orders;
