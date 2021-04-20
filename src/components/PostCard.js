import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import Popup from "./CustomPopup";

const PostCard = (props) => {
  const { post } = props;
  const { id, likes, likeCount } = post;
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="tiny"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{post.username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${post.id}`}>
          {moment(parseInt(post.createdAt)).fromNow(true)}
        </Card.Meta>
        <Card.Description>{post.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <Popup content="Comment on post">
          <Button as={Link} to={`/posts/${post.id}`} labelPosition="right">
            <Button basic color="blue">
              <Icon name="comments" />
            </Button>
            <Label basic color="blue" pointing="left">
              {post.commentCount}
            </Label>
          </Button>
        </Popup>
        {user?.username === post.username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
