import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      uid
      locale
      role
      createdAt
      updatedAt
    }
  }
`
