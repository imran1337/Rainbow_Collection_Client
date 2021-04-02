import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../Firebase";
import { Table, Container, Button } from "react-bootstrap";
import { CircularProgress } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const CheckOut = () => {
  window.document.title = "Rainbow || Checkout";
  const [cart, setCart] = useState([]);
  const [fiteredCartId, setFilteredCartId] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [isSpinnerShow, setIsSpinnerShow] = useState(true);
  const history = useHistory();

  const redirect = () => {
    alert("auth token not found");
    history.push("/login");
  };

  const getCart = async () => {
    if (!auth.currentUser) {
      return redirect();
    }

    try {
      const response = await axios(`https://nameless-lowlands-72199.herokuapp.com/get-cart-products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      });
      setCart(response.data);
      console.log("hello cart ", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const getCartProductDetailsById = async () => {
    // if (!auth.currentUser) {
    //   alert("auth token not found. Click Home then comeback again cart");

    //   return;
    // }

    const filterProductId = cart.map((d) => d.productId);
    const filterUnique = filterProductId.filter(
      (d, i) => filterProductId.indexOf(d) === i
    );
    setFilteredCartId(filterUnique);
    try {
      const response = await axios(
        "https://nameless-lowlands-72199.herokuapp.com/get-product-details-by-id",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
          data: filterUnique,
        }
      );
      setCartProduct(response.data);
      console.log("here", response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getCartProductDetailsById();
    console.log("running hook");
  }, [cart]);

  const cartProductPrice = cartProduct.map((pd) => pd.price);
  const totalPrice = cartProductPrice.reduce((p = 0, c = 0) => +p + +c, []);

  const checkOutSubmit = async () => {
    const { displayName, email } = auth.currentUser;
    const checkOutProducts = {
      name: displayName,
      email,
      products: cartProduct,
      quantity: 1,
      totalPrice,
    };
    console.log(checkOutProducts);

    try {
      const response = await axios(`https://nameless-lowlands-72199.herokuapp.com/submit-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
        data: checkOutProducts,
      });
      console.log(response);
      setIsSpinnerShow(false);
      getCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartProduct = async (_id) => {
    // const removeProductDetail = {
    //   _id,
    //   email: auth.currentUser.email,
    // };
    // const response = await axios(`https://nameless-lowlands-72199.herokuapp.com/delete-cart-product`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `Bearer ${localStorage.getItem("idToken")}`,
    //   },
    //   data: removeProductDetail,
    // });
    // console.log(response);
    alert("comming soon");
  };

  return (
    <>
      {cartProduct.length === 0 ? (
        <>
          {isSpinnerShow ? (
            <div class="home_spinner_center">
              <CircularProgress />
            </div>
          ) : (
            <div className="text-center mt-5">
              <p className="display-4">
                Hey {auth.currentUser.displayName} your order submitted.
              </p>
              <Button onClick={() => history.push("/home")}>Go Home</Button>
            </div>
          )}
        </>
      ) : (
        <Container className="mt-5">
          <h3 className="my-3">Cart Products</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartProduct.map((pd) => {
                console.log(pd);
                const { _id, name, price } = pd;
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>1</td>
                    <td>&#2547; {price}</td>
                    <td>
                      <DeleteForeverIcon
                        className="text-danger mouse_pointer"
                        onClick={() => {
                          removeCartProduct(_id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr className="font-weight-bold">
                <td colSpan="2">Total</td>
                <td colSpan="2">&#2547; {totalPrice}</td>
              </tr>
            </tbody>
          </Table>
          <Button className="float-right rounded-3" onClick={checkOutSubmit}>
            Check Out
          </Button>
        </Container>
      )}
    </>
  );
};

export default CheckOut;
