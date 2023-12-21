import gql from 'graphql-tag'

export const CHANGE_DAYS_OFF = gql`
  mutation changeDaysOff($id: String!, $daysOff: [Int!]!) {
    changeDaysOff(id: $id, daysOff: $daysOff) {
      daysOff
    }
  }
`;

