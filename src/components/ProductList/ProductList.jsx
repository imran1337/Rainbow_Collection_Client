import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { CircularProgress } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

const ProductList = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [editProductDetails, setEditProductDetails] = useState({});
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log("onsubmit", data);
      const sizeArray = data.size.split(",");
      const newData = { ...data, size: sizeArray };
      console.log(newData);
      const response = await axios(
        `http://localhost:5000/edit-product-by-id/${data._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          data: newData,
        }
      );
      if (await response.data.success) {
        getProducts();
        setModalShow(false);
        alert(response.data.msg);
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
          toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const editProduct = async (event, _id) => {
    try {
      console.log(event.target.parentNode.parentElement.parentNode);
      console.log(_id);
      const response = await axios.get(
        `http://localhost:5000/get-single-product-details-by-id/${_id}`
      );
      setEditProductDetails(response.data);
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const { _id, name, price, size, createdAt, imageURL } = editProductDetails;
    console.log(editProductDetails);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              type="hidden"
              name="_id"
              defaultValue={_id}
              ref={register({ required: true })}
            />
            <Form.Control
              type="hidden"
              name="createdAt"
              defaultValue={createdAt}
              ref={register({ required: true })}
            />
            <Form.Control
              type="hidden"
              name="imageURL"
              defaultValue={imageURL}
              ref={register({ required: true })}
            />
            <Form.Group controlId="pdName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                defaultValue={name}
                ref={register({ required: true })}
              />
            </Form.Group>
            <Form.Group controlId="pdSize">
              <Form.Label>Product Size</Form.Label>
              <Form.Control
                name="size"
                defaultValue={size}
                ref={register({ required: true })}
              />
            </Form.Group>
            <Form.Group controlId="pdPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                name="price"
                defaultValue={price}
                ref={register({ required: true })}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button type="submit" className="m-2" variant="success">
                Save
              </Button>
              <Button className="m-2" onClick={props.onHide}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      {products.length === 0 ? (
        <div class="home_spinner_center">
          <CircularProgress />
        </div>
      ) : (
        <>
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
                      <td>
                        {size.map((s) => (
                          <span>
                            {s}
                            {size.length > 1 && ","}
                          </span>
                        ))}
                      </td>
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
                            onClick={(event) => editProduct(event, _id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </>
      )}
    </>
  );
};

export default ProductList;
