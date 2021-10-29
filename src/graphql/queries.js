import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
        edges {
          node {
            createdAt
            fullName,
            ratingAverage,
            forksCount,
            reviewCount,
            stargazersCount,
            description,
            language
            id
            name
            ownerAvatarUrl
            ownerName
          }
        }
    }
  }
`;

export const SIGNUP = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: {
      username: $username,
      password: $password,
    }) {
      username
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

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!){
    createReview(review: $review) {
      repositoryId
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