import gql from 'graphql-tag'

export const GET_POINT_BY_UID = gql`
query {
    pointByUid {
      id
      uid
      userName
      usablePoints
      totalPoints
      isPublic
    }
  }
`  

export const GET_RANK = gql`
query {
    rank
  }
`