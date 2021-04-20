import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Icon, Label } from "semantic-ui-react";

import * as POSTS from "../graphql/posts";


const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(POSTS.LIKE, {
    variables: {postId: id}
  })

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button basic color="teal">
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" basic color="teal">
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
