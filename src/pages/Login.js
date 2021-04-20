import React, { useContext, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form, Grid } from "semantic-ui-react";

import {AuthContext} from "../context/auth"
import { useForm } from "../utilities/hooks";

const Login = (props) => {
  const context = useContext(AuthContext)
  const initialState = {
    username: "",
    password: "",
  };
  const [errors, setErrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCall, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, {data: {login: userData}}) {
      context.login(userData)
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginUserCall() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Grid>
        <Grid.Row>
          <div className="page-title">Login</div>
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
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={onChange}
          error={errors.password ? true : false}
        />
        <Button type="submit" primary>
          Login
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

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      createdAt
      token
    }
  }
`;

export default Login;
