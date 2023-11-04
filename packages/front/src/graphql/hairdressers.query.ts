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

export const GET_HAIRDRESSER_BY_ID = gql`
query hairdresser($id: String!) {
  hairdresser(id: $id){
    id,
    name
  }
}
`