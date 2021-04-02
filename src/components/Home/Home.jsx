import React, { useEffect, useState } from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import HomeProductCard from "../HomeProductCard/HomeProductCard";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import "./Home.css";

const Home = () => {
  window.document.title = "Rainbow || Home";
  const [products, setProducts] = useState([]);

  const getProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-product`);
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <section id="search_option">
        <div className="d-flex justify-content-center mt-5">
          <InputGroup
            className="mb-4 mt-5 mx-3 border border-primary rounded-lg"
            style={{ maxWidth: "570px" }}
          >
            <FormControl placeholder="search product..." />
            <InputGroup.Append>
              <Button variant="primary" className="border-primary">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

        {products.length === 0 ? (
          <div class="home_spinner_center">
            <CircularProgress />
          </div>
        ) : (
          <Container
            fluid
            className="mt-5 d-flex flex-wrap justify-content-center align-items-center"
          >
            {products.length &&
              products.map((product) => {
                console.log(product);
                const { _id, name, price, imageURL } = product;
                return (
                  <HomeProductCard
                    name={name}
                    price={price}
                    imageURL={imageURL}
                    _id={_id}
                  />
                );
              })}
          </Container>
        )}
      </section>
    </div>
  );
};

export default Home;
