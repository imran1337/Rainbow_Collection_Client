import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import vest, { test, enforce } from "vest";
import axios from "axios";

const AddProduct = () => {
  const validationSuite = vest.create((data = {}) => {
    test("name", "Name is required", () => {
      enforce(data.name).isNotEmpty();
    });

    test("size", "Size is required", () => {
      enforce(data.size).isNotEmpty();
    });

    test("price", "Price is required", () => {
      enforce(data.price).isNotEmpty();
    });
  });

  // state
  const [imageUrl, setImageURL] = useState(null);

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: vestResolver(validationSuite),
  });

  const onSubmit = async (data) => {
    const imgURL = await imageUrl;
    if (imgURL === null) {
      return alert("image not uploaded yet!");
    }
    data.imageURL = imgURL;
    console.log(data.size);
    try {
      const response = await axios.post("http://localhost:5000/add-product", {
        ...data,
        size: data.size.split(","),
      });
      console.log(response.data);
      if (response.data.price) {
        alert("Product Added");
      }
      setImageURL(null);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (event) => {
    const imageData = new FormData();
    imageData.set("key", process.env.REACT_APP_IMGBB_API_KEY);
    imageData.set(
      "name",

      Math.round(1000000000000000 + Math.random() * 9000000000000000) *
        new Date().getTime()
    );
    imageData.append("image", event.target.files[0]);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload`,
        imageData
      );
      setImageURL(response.data.data.display_url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label htmlFor="name">Product Name</Form.Label>
            <Form.Control
              placeholder="Product Name"
              id="name"
              name="name"
              ref={register}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label htmlFor="size">Size</Form.Label>
            <Form.Control type="text" id="size" name="size" ref={register} />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label htmlFor="price">Add Price</Form.Label>
            <Form.Control
              id="price"
              name="price"
              placeholder="Enter Price"
              ref={register}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} md={6}>
            <Form.Label htmlFor="image">Banner Image</Form.Label>
            <Form.Control
              type="file"
              id="image"
              name="image"
              onChange={handleImageUpload}
            />
          </Form.Group>
        </Form.Row>
        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
