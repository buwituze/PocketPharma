import { gql } from "@apollo/client";

export const GET_USERS = gql`
 query GetUsers {
  getUsers {
    email
    firstName
    id
    lastName
    nationalId
    licenseNumber
    password
    phoneNumber
    role
    username
  }
}
`;
