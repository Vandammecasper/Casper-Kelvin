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

export const GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_ID =  gql`
  query($id: String!) {
    appointmentsByHairdresserId(id: $id) {
      id
      date
      totalTime
      uid
      userName
      services {
        id
        name
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

export const COMPLETE_APPOINTMENT =  gql`
  mutation($id: String!) {
    completeAppointment(id: $id) {
      id
    }
  }
`