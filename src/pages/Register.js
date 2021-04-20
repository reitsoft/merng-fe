import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form, Grid } from "semantic-ui-react";

import {AuthContext} from "../context/auth"
import { useForm } from "../utilities/hooks";

const Register = (props) => {
  const context = useContext(AuthContext)
  const initialState = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  };
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, {data: {register: userData}}) {
      context.login(userData)
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Grid>
        <Grid.Row>
          <div className="page-title">Register</div>
        </Grid.Row>
      </Grid>

      <Form
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
        style={{ marginTop: 30 }}
        className={loading ? "loading" : ""}
      >
        <Form.Input
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={onChange}
          error={errors.username ? true : false}
        />
        <Form.Input
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={onChange}
          error={errors.email ? true : false}
        />
        <Form.Input
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Form.Input
          type="password"
          label="Confirm password"
          placeholder="Confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          error={errors.confirmPassword ? true : false}
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message" width={4}>
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Register;
