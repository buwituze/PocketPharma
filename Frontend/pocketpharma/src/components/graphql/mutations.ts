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

export const ADD_MEDICINE= gql`
 mutation AddMedicine($name: String!, $picture: String!, $category: String!, $amount: Int!, $type: MedicineType!, $description: String!, $sideEffects: String) {
  addMedicine(name: $name, picture: $picture, category: $category, amount: $amount, type: $type, description: $description, sideEffects: $sideEffects) {
    amount
    category
    description
    id
    name
    picture
    sideEffects
    type
  }
}
`;

