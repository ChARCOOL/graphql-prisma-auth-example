import { gql } from 'graphql-request'

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(
      data: { username: $username, email: $email, password: $password }
    ) {
      email
      password
    }
  }
`

export const LOG_IN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        username
        email
        refreshToken
      }
    }
  }
`

export const RENEW_ACCESS_TOKEN = gql`
  mutation renewAccessToken($token: String!) {
    renewAccessToken(token: $token) {
      accessToken
    }
  }
`

export const ME = gql`
  query {
    me {
      email
      username
    }
  }
`
