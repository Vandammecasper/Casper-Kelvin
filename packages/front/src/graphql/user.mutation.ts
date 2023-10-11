import gql from 'graphql-tag'

export const ADD_USER = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
        id
        uid
        name
        locale
        role
        createdAt
        updatedAt
        }
    }
`
