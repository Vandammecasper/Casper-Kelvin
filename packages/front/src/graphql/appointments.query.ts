import gql from 'graphql-tag'

export const GET_ALL_APPOINTMENTS_BY_UID =  gql`
query($isOpen: Boolean!) {
    appointmentsByUid(isOpen: $isOpen) {
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
      extra{
        id
        name
        description
        price
        utilities
      }
      price
      addedPoints
      isCompleted
    }
  }
`  

export const GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_UID =  gql`
  query {
    appointmentsByHairdresserUid {
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
      extra{
        id
        name
        description
        price
        utilities
      }
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