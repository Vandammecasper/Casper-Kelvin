import gql from 'graphql-tag'

export const GET_PUBLIC_POINTS = gql`
query($sort: Boolean!) {
    pointsPublic(sort: $sort){
      id
      uid
      userName
      usablePoints
      totalPoints
      isPublic
    }
  }
`  