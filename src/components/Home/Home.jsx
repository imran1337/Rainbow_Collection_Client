import React from "react";
import { Button, Container, FormControl, InputGroup } from "react-bootstrap";
import Header from "../Header/Header";
import HomeProductCard from "../HomeProductCard/HomeProductCard";

const Home = () => {
  return (
    <div>
      <section id="search_option">
        <div className="d-flex justify-content-center mt-5">
          <InputGroup
            className="mb-4 mt-5 border border-primary rounded-lg"
            style={{ maxWidth: "570px" }}
          >
            <FormControl placeholder="search product..." />
            <InputGroup.Append>
              <Button variant="outline-primary" className="border-primary">
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>

        <Container
          fluid
          className="mt-5 d-flex flex-wrap justify-content-center align-items-center"
        >
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
          <HomeProductCard />
        </Container>
      </section>
    </div>
  );
};

export default Home;
