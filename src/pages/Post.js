import React, { useContext, useState, useRef } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";

import * as POSTS from "../graphql/posts";
import { AuthContext } from "../context/auth";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";

const Post = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const commentInputRef = useRef(null);

  const { loading, error, data } = useQuery(POSTS.FETCH_ONE, {
    variables: { postId },
  });

  const [submitComment] = useMutation(POSTS.CREATE_COMMENT, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const {
    id,
    username,
    body,
    createdAt,
    likeCount,
    commentCount,
    likes,
    comments,
  } = data.getPost;

  function deletePostCallback() {
    props.history.push("/");
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            size="small"
            float="right"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(parseInt(createdAt)).fromNow(true)}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likeCount, likes }} />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log("Comment on Post!")}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user?.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {user && (
            <Card fluid>
              <Card.Content>
                <Form>
                  <div className="ui action input fluid">
                    <input
                      autoComplete="off"
                      type="text"
                      placeholder="Comment on post..."
                      name="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      ref={commentInputRef}
                    />
                    <button
                      type="submit"
                      className="ui button teal"
                      disabled={comment.trim() === ""}
                      onClick={submitComment}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                {user && user.username === comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Card.Header>{comment.username}</Card.Header>
                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                <Card.Description>{comment.body}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Post;
