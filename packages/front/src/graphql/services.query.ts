import gql from 'graphql-tag'

export const GET_ALL_SERVICES = gql`
query {
    services {
      id
      name
      description
      price
      duration
      utilities
    }
  }
`  