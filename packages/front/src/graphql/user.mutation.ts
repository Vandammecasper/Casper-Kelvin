import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      uid
      userName
      locale
      role
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_USER_ROLE = gql`
  mutation updateRole($id: String!, $role: String!) {
    updateRole(id: $id, role: $role) {
      id
      uid
      userName
      locale
      role
      createdAt
      updatedAt
    }
  }
`
