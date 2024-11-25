import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
 mutation RegisterUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!, $phoneNumber: String!, $role: String!, $nationalId: String, $licenseNumber: String) {
  registerUser(firstName: $firstName, lastName: $lastName, username: $username, email: $email, password: $password, phoneNumber: $phoneNumber, role: $role, nationalId: $nationalId, licenseNumber: $licenseNumber) {
    email
    firstName
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