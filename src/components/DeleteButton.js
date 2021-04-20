import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import * as POSTS from "../graphql/posts";
import Popup from "./CustomPopup";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? POSTS.DELETE_COMMENT : POSTS.DELETE_POST;

  const [deletePostOrComment] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({ query: POSTS.FETCH_ALL });
        const newData = {};
        newData.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: POSTS.FETCH_ALL, data: newData });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <Popup content={commentId ? "delete comment" : "Delete post"}>
        <Button
          as="div"
          basic
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </Popup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
};

export default DeleteButton;
