import gql from 'graphql-tag'

export const GET_USER_BY_UID = gql`
query userByUid($uid: String!) {
  userByUid(uid: $uid) {
    id
    uid
    locale
    role
    createdAt
    updatedAt
  }
}
`
