import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {,
      edges {
        node {
          fullName,
          ratingAverage,
          forksCount,
          reviewCount,
          stargazersCount,
          description,
          language
        }
      }
    }
  }
`;


export const AUTHORIZED_USER = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation authorize($username: String!, $password: String!){
    authorize(credentials: {
      username: $username,
      password: $password,
    }) {
      accessToken
    }
  }
`;

export const REPOSITORY = gql`
  query repository($id: ID!) {
    repository(id: $id) {
      fullName,
      ratingAverage,
      forksCount,
      reviewCount,
      stargazersCount,
      description,
      language
      url
      ownerAvatarUrl
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;