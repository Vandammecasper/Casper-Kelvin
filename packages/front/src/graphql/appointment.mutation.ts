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