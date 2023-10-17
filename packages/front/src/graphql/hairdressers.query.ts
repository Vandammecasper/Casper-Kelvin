import gql from 'graphql-tag'

export const GET_ALL_HAIRDRESSERS =  gql`
query {
    hairdressers {
      id
      name
      services {
        id
        name
        description
        price
        duration
        utilities
      }
    }
  }
`