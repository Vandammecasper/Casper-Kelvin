import gql from 'graphql-tag'

export const CHANGE_DAYS_OFF = gql`
  mutation ChangeDaysOff($id: String!, $daysOff: [Int!]!) {
    changeDaysOff(id: $id, daysOff: $daysOff) {
      daysOff
    }
  }
`;

