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

export const GET_EXTRA_BY_ID =  gql`
query($id: String!) {
  extra(id: $id) {
    id
    name
    description
    price
    utilities
  }
}
`