import gql from 'graphql-tag'

export const ADD_VACATION = gql`
    mutation($createVacationInput: CreateVacationInput!) {
        createVacation(createVacationInput: $createVacationInput) {
        id
        hairdresser {
            id
            name
        }
        startDate
        endDate
        isApproved
        createdAt
        }
    }
`

export const APPROVE_VACATION = gql`
    mutation($id: String!) {
        approveVacation(id: $id) {
        id
        hairdresser {
            id
            name
        }
        startDate
        endDate
        isApproved
        createdAt
        }
    }
`

export const REMOVE_VACATION = gql`
    mutation($id: String!) {
        removeVacation(id: $id) {
        id
        hairdresser {
            id
            name
        }
        startDate
        endDate
        isApproved
        createdAt
        }
    }
`