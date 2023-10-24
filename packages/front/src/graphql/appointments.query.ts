import gql from 'graphql-tag'

export const GET_ALL_APPOINTMENTS_BY_UID =  gql`
query {
    appointmentsByUid {
      id
      date
      totalTime
      uid
      userName
      hairdresser {
        id
        uid
        name
      }
      services {
        id
        name
        description
        price
        duration
        utilities
      }
      extras
      price
      addedPoints
      isCompleted
    }
  }
`  