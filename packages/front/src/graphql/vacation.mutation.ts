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