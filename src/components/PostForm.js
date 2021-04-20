import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";

import { useForm } from "../utilities/hooks";
import * as POSTS from "../graphql/posts";

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCall, { body: "" });
  const [errors, setErrors] = useState({});

  const [createPost] = useMutation(POSTS.CREATE_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: POSTS.FETCH_ALL,
      });

      const newData = {};
      newData.getPosts = [result.data.createPost, ...data.getPosts];

      proxy.writeQuery({
        query: POSTS.FETCH_ALL,
        data: newData,
      });
      values.body = "";
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function createPostCall() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h4>Create a Post</h4>
        <Form.Input
          placeholder="Hi World!"
          name="body"
          onChange={onChange}
          value={values.body}
          error={errors.inputText ? true : false}
        />
        <Button type="submit" color="teal">
          Submit
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
    </>
  );
};

export default PostForm;
