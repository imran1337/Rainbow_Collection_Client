import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-product`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const removeProduct = (_id) => {
    fetch(`http://localhost:5000/remove-product`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const { success, msg } = data;
        if (success) {
          getProducts();
          alert(msg);
        } else alert(msg);
      })
      .catch((err) => console.log(err));
  };

  const editProduct = (_id) => {
    console.log(_id);
  };

  return (
    <Table striped bordered hover className="mt-5">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Size</th>
          <th>Price</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products.length &&
          products.map((product) => {
            const { _id, name, size, price, createdAt } = product;
            return (
              <tr key={_id}>
                <td>{name}</td>
                <td>{size}</td>
                <td>{price}</td>
                <td>{new Date(createdAt).toLocaleString()}</td>
                <td>
                  <div className="d-flex">
                    <DeleteForeverIcon
                      className="text-danger mouse_pointer mr-2"
                      onClick={() => removeProduct(_id)}
                    />
                    <EditIcon
                      className="text-success mouse_pointer"
                      onClick={() => editProduct(_id)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
};

export default ProductList;
