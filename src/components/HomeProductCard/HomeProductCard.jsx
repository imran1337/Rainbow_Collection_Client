import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import "./HomeProductCard.css";
import { userContext } from "./../../App";
import { auth } from "./../../Firebase";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

const HomeProductCard = ({ _id, name, price, imageURL }) => {
  const [loggedInUser, setLoggedInUser] = React.useContext(userContext);
  const { displayName, email } = loggedInUser;

  let history = useHistory();
  // let location = useLocation();
  // let { from } = location.state || { from: { pathname: "/" } };

  const goToLogin = () => {
    history.push("/login");
  };

  const useToast = (msg, variant) => {
    return toast[variant](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const buyNow = async (_id) => {
    try {
      const productDetails = {
        userName: displayName,
        email,
        productId: _id,
      };

      const response = await axios(`http://localhost:5000/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
        data: productDetails,
      });

      const { success, msg } = response.data;
      console.log(response.data);
      success === true
        ? toast.success(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        : toast.error(msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
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
        <Card.Body className="d-flex flex-column justify-content-center w-100">
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
            <Button
              variant="primary"
              onClick={() => {
                (auth.currentUser && auth.currentUser.email && buyNow(_id)) ||
                  goToLogin();
              }}
            >
              Buy Now
            </Button>
          </div>
        </Card.Body>
      </Card>
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
    </>
  );
};

export default HomeProductCard;
