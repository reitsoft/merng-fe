import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

import * as POSTS from "../graphql/posts";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(POSTS.FETCH_ALL);

  let posts = [];
  if (!loading && data) posts = data.getPosts;

  return (
    <Grid columns={3}>
      <Grid.Row>
        <div className="page-title">Recent Posts</div>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h3>Loading ...</h3>
        ) : (
          <Transition.Group>
            {posts?.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
