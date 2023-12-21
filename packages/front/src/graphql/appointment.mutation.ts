import gql from 'graphql-tag'

export const CREATE_APPOINTMENT = gql`
mutation
  createAppointment($CreateAppointmentInput: CreateAppointmentInput!) {
    createAppointment(CreateAppointmentInput: $CreateAppointmentInput){
    date
    uid
    id
    userName
    date
  }
}
`

export const DELETE_APPOINTMENT_BY_ID = gql`
  mutation($id: String!) {
    removeAppointment(id: $id) {
      date
    }
  }
`