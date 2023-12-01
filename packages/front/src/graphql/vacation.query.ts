import gql from 'graphql-tag'

export const GET_ALL_VACATIONS = gql`
    query {
        vacations {
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

export const GET_ALL_VACATIONS_BY_UID =  gql`
    query {
        vacationsByUid {
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