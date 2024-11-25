import { gql } from "@apollo/client";

export const GET_USERS = gql`
 query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    firstName
    email
    id
    lastName
    licenseNumber
    nationalId
    password
    phoneNumber
    role
    username
  }
}
`;
