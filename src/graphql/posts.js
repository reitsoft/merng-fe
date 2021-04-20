import { gql } from "@apollo/client";

export const FETCH_ALL = gql`
  query {
    getPosts {
      id
      body
      username
      createdAt
      commentCount
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
      }
    }
  }
`;

export const FETCH_ONE = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      username
      createdAt
      updatedAt
      commentCount
      likeCount
      comments {
        id
        body
        username
      }
      likes {
        id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
      likeCount
      commentCount
      likes {
        id
        username
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body){
      id
      commentCount
      comments{
        id body username createdAt
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const LIKE = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likeCount
      likes {
        id
        username
      }
    }
  }
`;
