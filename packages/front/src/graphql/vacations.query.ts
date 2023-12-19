import gql from 'graphql-tag'

export const GET_ALL_VACATIONS =  gql`
    query {
        vacations {
        id
        startDate
        endDate
        hairdresserId
        isApproved
        }
    }
`