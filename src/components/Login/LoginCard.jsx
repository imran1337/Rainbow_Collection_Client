import React from "react";
import { Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
const LoginCard = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    reset();
    alert('Login Comming Soon...Please Use Google To continue')
  };
  return (
    <Card style={{ backgroundColor: "#e3f2fd" }}>
      <Card.Body>
        <h2 className="text-center mb-4">Log In</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              id="email"
              name="email"
              ref={register({ required: true })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              id="password"
              name="password"
              ref={register({ required: true })}
            />
          </Form.Group>
          <Form.Control
            type="submit"
            className="btn btn-primary"
            value="Login"
          />
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginCard;
