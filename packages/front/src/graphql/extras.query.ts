import gql from 'graphql-tag'

export const GET_ALL_EXTRAS =  gql`
query {
    extras {
      id
      name
      description
      price
      utilities
    }
  }
`  